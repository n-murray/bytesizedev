---
title: "A Beginners Guide to Understanding Docker"
excerpt: "A high-level overview of Docker and its underlying technology, Containers. What they are, and why you should care in plain language understandable by humans."
coverImage: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*K9p8xqsKVIDt6RmNRfzB5w.png"
date: "2022-01-23"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*K9p8xqsKVIDt6RmNRfzB5w.png"
---
## Introduction
In 2020 I undertook a software engineering internship with a large software company, and I quickly realized that most of what I had been learning as part of my software degree was either irrelevant or completely outdated.

This realization brought me to the conclusion that if am going to succeed in the world of software I would have to start taking it upon myself to learn about the technologies and techniques that are actually being used in the industry.

One of the biggest hurdles for me joining a mature agile team wasn’t trying to understand the existing codebase, it was trying to get to grips with Docker and how they used it for running acceptance tests as part of the CI/CD pipeline.

So I decided to start looking into Docker to answer a few questions I had about it. These questions were as follows:

- What is Docker?
- What’s its purpose?
- How does it help make my life easier?

So I set off out into the wild plains of Google and began trying to wrangle up answers to those questions, and I found myself in a rabbit hole of more questions about the answers to my original questions. Eventually, after a couple of w̶e̶e̶k̶s̶ months of research, I was able to start building up the picture in my head of how it worked and what could be achieved with Docker and its underlying technologies. So here it is in the clearest language I can think of to explain it.

## Containers

So first things first, to understand what Docker is we first need to understand what a container is.

A container (when running) is an isolated environment that contains all the resources it needs to run a piece of software [1]. These environments are run using [operating system (OS) level virtualization](https://en.m.wikipedia.org/wiki/OS-level_virtualization) rather than [hardware-level virtualization](https://en.wikipedia.org/wiki/Hardware_virtualization), which would traditionally be used when creating a virtual machine (VM). The main advantage that containers have over VMs is how lightweight they are in terms of system resources needed; this is down to the differences in the aforementioned virtualisation techniques.

VMs virtualize physical hardware, because of this each VM contains a full copy of the guest OS, the OS running in the VM; and all the libraries and dependencies needed to run your application. Containers on the other hand virtualize the operating system, this results in the container only needing the specific dependencies of the application it will be running. This is because the container uses the underlying resources and features of the host systems OS [2].

The lightweight and hardware-agnostic nature of containers allow them to be run on a wide range of environments from a low-powered device such as a Raspberry Pi to a cloud-based system with a vast number of resources available to it.<br><br>

To run a container, you need to have a container engine and an image. A container engine is a system that initiates and runs your containers in a virtualized environment, the most popular of these is Docker. An image is a template that can be used to create a container. It contains the list of specifications for what a container will run and how it will run them. Images can be easily created locally using a [Dockerfile](https://docs.docker.com/engine/reference/builder/) or pulled from a remote repository and are mostly based on the image format defined by the [Open Container Initiative (OCI)](https://opencontainers.org/faq/#n22)


_TLDR / TLDU: A simple explanation of a containers is to think of them as cookies, cut out and defined by an image (the proverbial cookie cutter). Or for those who are familiar with Object Oriented Programming, think of the image as a class and the container as an instance of that class._

## Docker

So now that we have an idea of what a container is, what is Docker? Well as I eluded to above, Docker is essentially a container engine. This may be a bit oversimplified but here goes my best effort at explaining how it works. When people talk bout Docker they are commonly referring to the Docker Engine, which is a set of services made up of the Docker daemon, Docker API, and Docker CLI.

1. Docker daemon: This the where the magic actually happens! It manages all the containers, images, networks and, volumes. (Networks are pretty self-explanatory, Volumes can be thought of as persistent storage for a container)

2. Docker API: This is a REST API exposed by the daemon to accept instructions/commands from tools such as the Docker client.

3. Docker CLI (Client): This is the main way that Docker users interact with Docker. It is a command-line interface that has multiple different commands that can be used to communicate with the API and by extension the daemon. An important point to emphasise here is that the client can connect to multiple daemons, and those daemons can be hosted on remote machines.

_TLDR / TLDU: Docker is a set of services that work together to allow users to create and manage container instances that can be running on a local machine or one hosted remotely. It can be controlled using the command-line based client or more recently the Docker Desktop application (if you’re into that sort of thing)._

## Great but why should I care?

Because it’s everywhere!.. but seriously I think you would be hard-pressed to find a section of the software industry that does not require some form of interaction or understanding of Docker and containers themselves.

They are used everywhere from in a development environment to run an application locally for testing to a production environment for use by end-users of an application. They also help to stop getting the [725 error code](https://github.com/joho/7XX-rfc#:~:text=725%20%2D%20It%20works%20on%20my%20machine) by having a completely clean environment that is untouched by other system applications or files that could prevent an application from behaving the same across multiple machines.

They also bring with them some great benefits such as horizontal scalability and elasticity, whereby you can use container management systems such as [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) to automatically create more instances of a container when demand is high and then remove them again when the demand has reduced.

There are many different and interesting ways that you can benefit from containers so I won’t even attempt to cover them all here in the interest of brevity.

## Wrapping Up

I hope that this article can help some people, as few as it may be; understand a little more about Docker and Containers. If you find anything that is incorrect above feel free to educate me! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback.
If you enjoyed the article consider subscribing for updates on my future articles, also if you are not already a member on Medium you can join using [my membership link](https://n-murray.medium.com/membership)

## References
[1] ^ D. V. N. R. S. David Jaramillo, “Leveraging microservices architecture by using Docker technology,” in SoutheastCon 2016, Norfolk, VA, USA, 2016.
[2] ^ IBM Cloud Team, “Containers vs. VMs: What’s the Difference?,” IBM, 02 09 2020. [Online]. Available: https://www.ibm.com/cloud/blog/containers-vs-vms.
