---
title: "A Beginners Guide to Understanding Kubernetes: ConfigMaps and Secrets"
excerpt: "A high-level overview of ConfigMaps and Secrets in Kubernetes. What they are and what you can do with them in a high-level and beginner friendly language."
coverImage: "https://miro.medium.com/v2/format:webp/1*80SK2b_c1nx5Ur_VfeTDyg.png"
date: "2023-01-23"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/format:webp/1*80SK2b_c1nx5Ur_VfeTDyg.png"
---

## Introduction

When you start out on your cloud computing journey and begin to containerise your applications you will face a number of issues that are typically pretty trivial. An example of one of these issues is configuring environmental variables for your applications to use while running or when starting up. So how would you do that? Do you add the environmental variables to each application's code repository that wants to use them and create a lot of duplication? Or what about variables that are private (e.g. passwords, keys) that definitely should **not** be exposed in a repository?

Luckily, Kubernetes offers a very flexible solution for those problems, in the form of ConfigMaps and Secrets.

## So what is a ConfigMap?

ConfigMaps are Kubernetes objects that can inject non-sensitive data such as host names, as environmental variables into your Pods, specifically your containers. They can also be used to mount a read-only file into the container, as long as it does not exceed 1Mib.

> Although the intended purpose is for mounting configuration and properties files, they are **not** restricted to just those types and can also be used to mount many different types of files such as **scripts**. This can be very useful to get a script into a container for troubleshooting or to prevent you needing to bake it into an image.

In the below code snippet below I am defining a ConfigMap for my hypothetical application called “my-app”. In it we are defining a couple of properties in the key-value form and also we are defining a properties file that can be mounted in your container as a volume.

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  my_server_hostname: "myapp-website"
  my_server_port: "5555"
  #Properties file being described, to be mounted as a volume
  myapp.properties: |
    maxRetries=5
    logLevel=INFO 
    deployment.type=Production
```

A ConfigMap specification that shows how to define both individual values and a file.

Simply defining the ConfigMap does not make it instantly available in your Pods, they have to be added to the Pods specification. In the example below I have shown how we can use the key-value properties and the files.

```
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
spec:
  containers:
    - name: my-app
      image: custom-image
      env:
        - name: SERVER_HOSTNAME  # Name of the environmental variable in your container
          valueFrom:
            configMapKeyRef:
              name: my-app-config     # The name of the ConfigMap above.
              key: my_server_hostname # The property key to fetch.
        - name: SERVER_PORT # This is the name we reference within the container
          valueFrom:
            configMapKeyRef:
              name: my-app-config
              key: my_server_port
      volumeMounts: # Mounting the ConfigMap as a Volume to the container
      - name: my-app-config-volume
        mountPath: "/app" # The directory our myapp.properties file will appear
        readOnly: true
  volumes: # ConfigMaps are added as Volumes to the Pod
  - name: my-app-config-volume # Name of the volume
    configMap:
      name: my-app-config # The name of our ConfigMap above
```

A Pod specification that shows how to mount and use a ConfigMap in your Pods.

An important and useful point to note on the key-value properties defined in a ConfigMap is that when it is mounted to your container, it will also appear as a file with the value inside it and the key for a name. This can be prevented if it is not wanted by defining a list of items in the [volume spec of your Pod](https://gist.github.com/n-murray/188a194d205b7edef8c4340295002998).

## It’s a Secret shhhh!

Secrets are similar to ConfigMaps in many ways. They can be used to mount files into your Pods containers and for defining environmental variables. The main difference is that the keys and data stored in them must be base64 encoded, but strangely by default, the Secrets are not actually encrypted when they are stored in the API server's data store (etcd). This default functionality might make you question whether they are actually secret or not because anyone with access to etcd will be able to access your Secrets. Additionally, anyone who can deploy a Pod in your namespace can mount the Secret to their Pod and be able to access it. You can thankfully [enable encryption of the data stored in etcd](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/).

In the below code snippet, I have defined a Secret specification that has two keys, username and password; that could be mounted as environmental variables in your Pod. I have also defined a file that has been base64 encoded just like the two previous two keys. This file could be anything that should be kept secret as long as it is less than 1Mib.

```
apiVersion: v1
kind: Secret
metadata:
  name: my-app-secret
data:
  #Secret environmental variables
  username: bmljaG9sYXMK
  password: c3VwZXJTZWNyZXRQYXNzd29yZAo=
  #A file that can be mounted to our Pods
  secret-file: |
    VGhpcyBpcyBhIHJlYWxseSByZWFsbHkgc2VjcmV0IGZpbGUKCmh0dHBzOi8vd3d3LnlvdXR1YmUu
    Y29tL3dhdGNoP3Y9ZFF3NHc5V2dYY1EKCkdvIHRvIGh0dHBzOi8vbWVkaXVtLmNvbS9Abi1tdXJy
    YXkgZm9yIG1vcmUgYmVnaW5uZXJzIGd1aWRlcyBsaWtlIHRoaXMgb25lCg==
```

A Secret specification that shows how to define both, individual keys and a file.

Just like a ConfigMap, to use them in our Pods we need to mount them to our Pods as either a volume or as environmental variables. In the next code snippet, I have done just that and defined an example Pod specification that uses our Secret defined above.

```
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
spec:
  containers:
    - name: my-app
      image: custom-image
      env:
        - name: USER_NAME  # Name of the environmental variable in your container
          valueFrom:
            secretKeyRef:
              name: my-app-secret # The name of the Secret above.
              key: username # The property key to fetch.
        - name: PASSWORD # This is the name we reference within the container
          valueFrom:
            secretKeyRef:
              name: my-app-secret
              key: password
      volumeMounts: # Mounting the Secret as a Volume to the container
      - name: my-app-secret-volume
        mountPath: "/etc/secret"
        readOnly: true
  volumes: # Secrets are added as Volumes to the Pod
  - name: my-app-secret-volume # Name of the volume
    configMap:
      name: my-app-secret # The name of our Secret above
```

A Pod specification that shows how to mount and use a Secrets in your Pods.

There are a few different types of Secrets, they are used to distinguish the different use cases of the data within them. Based on these different types Kubernetes will carry out different validation and add different constraints to them.

**Opaque**: This is the default type of Secret, and what is defined in the example above.

**Docker config:** These Secrets are used to define credentials used for accessing container image registries.

**Basis authentication:** Basic auth tokens are used to store credentials. The secret must contain username or password as its keys. In my example Secret above I could have used a basic authentication secret to define my username and password keys. This type of secret is mainly for convenience to identify the purpose of the Secret.

**Service account token:** These Secrets are used to store a token used to identify a service account. These are no longer used as of Kubernetes 1.22.

**SSH:** This type of Secret is used for storing ssh keys and again is only for identifying the purpose of the Secret.

**TLS:** Another convenience type that can be used for storing TLS files such as “**.crt”** and “**.key**” file types.

**Bootstrap token**: Bootstrap token Secrets are usually created in the kube-system namespace, they are supposed to be used as a bearer token when creating your cluster or adding new nodes.

## Wrapping up

I hope that this article has helped some of you learn a little bit more about Kubernetes and helps you on your educational journey! If you find anything that is incorrect or misleading in the article go ahead and let me know what it is so I can learn from it! I write all my articles as an educational experience for myself as well as others so I welcome constructive feedback. Also, let me know if anyone decoded the file in my example Secret above!

If you enjoyed the article consider [subscribing](https://n-murray.medium.com/subscribe) for updates on my future articles, also if you are not already a member on Medium you can join using [my membership link](https://n-murray.medium.com/membership).

## Resources

[1] — [https://kubernetes.io/docs/concepts/configuration/configmap/](https://kubernetes.io/docs/concepts/configuration/configmap/)

[2] — [https://kubernetes.io/docs/concepts/configuration/secret/](https://kubernetes.io/docs/concepts/configuration/secret/)

[3] — [https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)
