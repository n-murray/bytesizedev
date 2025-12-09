---
title: "A Beginners Guide to Understanding Kubernetes: Network Policies"
excerpt: "A high-level beginner-friendly overview of Network Policies in Kubernetes and why you should care about them."
coverImage: "https://miro.medium.com/v2/1*5Xzx-CjvLMbaDeAp-JyDxA.png"
date: "2023-01-14"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/1*5Xzx-CjvLMbaDeAp-JyDxA.png"
---
## Introduction

An often overlooked but important part of deploying your applications in Kubernetes is securing the network traffic in and out of your Pods. You can do this in a couple of different ways but one of the easiest ways to do it is by using a Network Policy.

But what is a Network Policy? And what can we do with them?

If you don’t already know what a Pod is take this opportunity to go back and read [part one of my Kubernetes Beginners Guide series](https://medium.com/geekculture/a-beginners-guide-to-understanding-kubernetes-ea41a8605850).

## So what are they?

[Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) are Kubernetes resources that can be used to block network traffic at the IP address and port level, it does this by using a set of selectors to filter out and allow traffic from (and to) specific network entities only.

The selectors used by network policies are all custom and must be specified by you or whoever is creating it. The selectors can be based on IP addresses, Namespaces and Pod labels, and all of these selectors can be stacked and used together to really fine-tune the access to your Pods. Allowing the use of labels as selectors gives us a lot of flexibility on how we want to filter our traffic since labels can be custom for each Pod.

## What do they do anyways?

Network Policies split our network traffic into two categories, or policy types; Ingress and Egress. Ingress refers to all incoming traffic to the Pod and likewise, egress refers to all outgoing traffic. By default without a Network Policy, ingress and egress are both unrestricted. Network Policies do not restrict internal Pod communication (Container to Container) in any way.

An important point to note about Network Policies is that they are additive and do not overwrite or conflict with other Network Policies. This means that if you have multiple policies that select a Pod based on the same label, e.g “app=backend”; all of those policies will be applied to any matching Pod with that label. This can lead to some unforeseen restrictions on traffic, so you should pay careful attention to all Network Policies in your Namespace and understand how they will stack. The easiest way to avoid any unforeseen blocking is to try and be specific with your Pod selection, this can be done by adding multiple label selectors that will match only the exact Pods you intended on affecting.

Another important consideration for designing Network Policies is that both Ingress and Egress policies must both allow traffic between Pods. This means if Pod A wants to communicate with Pod B, then Pod A must allow traffic **TO** Pod B and likewise, Pod B must allow traffic **FROM** Pod A.

We can also fine-tune our policies even more by restricting traffic to only specified ports using a specific protocol. This means we can prevent traffic from trying to access ports on our Pods other than those that we want it to. So for example, if we have an API listening on port 5555 we can specify that matching traffic can only target port 5555 using TCP.

## Examples

In the following example, we have a Network Policy that will block **ALL** incoming traffic to any Pod with the label “app=backend”. This is a straightforward and quick way to stop all incoming traffic to your Pod. Similarly, by changing or adding “Egress” below policyTypes on line 9 you could block all outgoing traffic.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-ingress
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
```


A Default Ingress policy that will block all incoming traffic.

In this next example, we are restricting all ingress traffic to our backend application, selected on line eight using the label “app=backend”. We are doing this by only allowing Pods with the label “app=frontend” to communicate with port 5555 and only using TCP. This can be restricted even further by applying more label selectors.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-ingress
spec:
  podSelector: 
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: frontend
        ports:
          - protocol: TCP
            port: 5555
```

A Network Policy that blocks traffic using a label selector and port designation

In the above example, we are allowing traffic from Pods with the label “app=frontend”, by default this only allows traffic from Pods within our own namespace. To allow traffic from Pods in another namespace we can do the following.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-ingress
spec:
  podSelector: 
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: frontend
        namespaceSelector:
          matchLabels:
            project: myApp
        ports:
          - protocol: TCP
            port: 5555
```
A Network Policy with a namespace selector.

This will only allow traffic from Pods with the label “app=frontend” **and** from any namespace with the label “project=myApp”.

I have given just a couple of simple examples of what you can do with Network Policies, and since this is a beginner’s guide I won’t be going any further. However, there are many more ways you can define your Network Policies so I would highly suggest checking out the [documentation](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to get a better idea of the possibilities.

## Wrapping Up

I hope this article has helped some of you understand Kubernetes Network Policies and what we can do with them. If you find anything that is incorrect or misleading in the article go ahead and let me know what it is so I can learn from it! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback.

If you enjoyed the article consider [subscribing](https://n-murray.medium.com/subscribe) for updates on my future articles, also if you are not already a member on Medium you can join using [my membership link](https://n-murray.medium.com/membership).