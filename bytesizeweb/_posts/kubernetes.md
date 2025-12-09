---
title: "A Beginners Guide to Understanding Kubernetes"
excerpt: "A high-level overview of Kubernetes and why it is so important in plain language understandable by beginners."
coverImage: "https://miro.medium.com/v2/resize:fit:700/1*wIhnopl1TLJKGKhIzjpbnw.png"
date: "2023-01-02"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/resize:fit:700/1*wIhnopl1TLJKGKhIzjpbnw.png"
---
# Introduction

In the modern world of software development, Kubernetes is everywhere. You can see its impacts at all levels of the development pipeline from locally on your laptop to deploying a finished system. It has very rapidly been adopted across the software development industry as a whole, leading to lots of new terminologies and many new variations of “as a service” applications, but what is it and why is it being so heavily adopted over the more traditional
---

## So what is a cluster?

According to the Oxford dictionary, a cluster is “_a group of things of the same type that grow or appear close together_” [2]. Of course, this doesn’t explain a Kubernetes cluster but it identifies that the cluster is made up of a group of things of the same type, this is the same for a Kubernetes cluster which is made up of nodes.

![My interpretation of a Kubernetes clusters architecture outlining the nodes and their components.](https://miro.medium.com/v2/resize:fit:700/1*w1yMP78-zXYDfmtUAcO4nw.png)

My interpretation of a Kubernetes cluster’s structure.

A node can be either a physical or virtual machine and can also be local or remote. The cluster can have up to 5000 nodes or as little as 1 for resource constrained environments or for learning. To be a working part of the cluster each node must run the following components.

1. **kubelet:** This is an agent that communicates with the cluster control plane (more on that later) and allows it to start, stop and monitor any workloads running on the node.
2. **kube-proxy:** This is a network proxy and by using network rules it allows communication inside and outside of your cluster.
3. **A container runtime:** This is what actually runs containers on the nodes. Some popular container runtimes that you might have heard of are Docker Engine and containerd. To learn more about containers and Docker [check out my previous guide](https://medium.com/geekculture/a-beginners-guide-to-understanding-docker-99f704436850).

But not all nodes are exactly the same and fulfill different roles in the cluster, these different node types are Master and Worker nodes.

Worker nodes are pretty self-explanatory and they are used to run the cluster's workload. This means that the actual application you are trying to deploy on your cluster will run on them in the form of a Pod, or many Pods depending on the size of your system.

Master nodes are responsible for running the control plane which as the name suggests controls the cluster and what is running on it, to do this they require a few additional components not mentioned above, these are the following:

1. **API Server:** This is the main interface for clients to interact with the cluster using [REST](https://medium.com/dev-genius/a-beginners-guide-to-understanding-rest-de9041cc8d90) requests. Using this interface clients can configure and monitor workloads running on the cluster.
2. **etcd**: This is the cluster state store, it is a lightweight key-value data store used to store all of the configuration data of the cluster and is representational of the state of the cluster at any one time.
3. **Scheduler:** The quick-minded among you may have already guessed what this does by its name, but for those reading before their first caffeinated drink I will explain. The scheduler schedules where ( i.e which node) each pod should be run on depending on resource availability and optionally user-defined criteria.
4. **Controller Manager:** This is used to control the state of the cluster by working with the API server and etcd, to establish the desired cluster state and make the necessary changes to work towards it.

Master nodes can also act as worker nodes and can be used to run workloads. Since technically only one master node is required per cluster additional master nodes are mainly added to achieve high availability of the API server and by extension the control plane.

---

## Ok great, so what can we even do with a cluster?

A Kubernetes cluster can be used to deploy a microservice based application. If you have gotten this far into the article and don’t understand what a microservice is yet then go check out my previous [guide explaining the architecture](https://medium.com/geekculture/a-beginners-guide-to-understanding-microservices-d2a8bae871b7). So what does a microservice based application look like in Kubernetes?

In the world of Kubernetes, a Pod (as in a Pod of whales ) is the smallest unit of deployment. A Pod is a grouping of one or more containers that have a shared context, networking and storage. There is no hard limit to the number of containers that can be run within a pod however because all containers within a Pod run on the same node you will have to take your individual worker node resources into consideration.

> If you start to run into a problem with the number of containers in your Pod, you should probably take a long look at your application's architecture and decide why you can’t pull some containers out into a separate Pod.

![A diagram showing three POD replicas running across three worker nodes within a kubernetes cluster.](https://miro.medium.com/v2/resize:fit:700/1*tav93VOW7K43b4GlVIENew.png)

Pods replicas running across multiple worker nodes in a cluster

In the above diagram, you can see how three replicas of the same Pod can be run across multiple worker nodes within your cluster. Each of the Pods in the example has three containers, a backend, a frontend and a logging application. In the context of these three Pods the backend and frontend containers could be considered the main applications and the logging container would be a utility that runs alongside the application. This type of utility container is called a sidecar and can also share all the same resources as the other containers.

Pods can also have Init containers, these containers will run to completion before the main application containers are started up. These init containers can be used for any initialisation tasks such as starting/creating a database.

When dealing with multiple replicas of a Pod, it is normal to also have a related [Service](https://kubernetes.io/docs/concepts/services-networking/service/) resource that will represent all of your replicas as a single entity on the network. This allows the service to load balance network traffic across all of the replicas to prevent one Pod from being over or underworked.

There are a number of ways to create a Pod, it can be created by itself as a Pod or created as part of a resource controller such as a Deployment or a StatefulSet. Depending on the needs of your application how you deploy your Pods will differ and that is outside the scope of this guide, however below is a list of possible controllers that can be used:

1. [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
2. [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
3. [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
4. [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
5. [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

---

# Wrapping up

I hope this article has helped some of you as a stepping stone onto the road into the world cloud native computing. If you liked the guide and would like to see a more in-depth or broader guide please leave a comment and let me know!

If you find anything that is incorrect or misleading in the article go ahead and let me know what it is so I can learn from it! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback.

If you enjoyed the article consider [subscribing](https://n-murray.medium.com/subscribe) for updates on my future articles, also if you are not already a member on Medium you can join using [my membership link](https://n-murray.medium.com/membership).

---
## References

[1] ^ Wikipedia Foundation Inc, “Kubernetes” [[https://en.wikipedia.org/wiki/Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)]

[2] ^ Oxford University Press, “Cluster” [[https://www.oxfordlearnersdictionaries.com/definition/english/cluster_1](https://www.oxfordlearnersdictionaries.com/definition/english/cluster_1)]