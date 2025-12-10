---
title: "A Beginners Guide to Understanding Microservices"
excerpt: "A high-level overview of the microservices architecture and what it means in plain language understandable by beginners."
coverImage: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wRD0Fp8NhFpaTNlV_9_5Yw.png"
date: "2022-02-07"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wRD0Fp8NhFpaTNlV_9_5Yw.png"
---
# Introduction

With the massive growth and adaptation of cloud services and infrastructure there is a new wave of cloud native applications being developed which need to be highly scalable, easy to maintain and efficient in terms of development and cost. Some examples of these applications can be seen today in the form of Netflix and Amazon which migrated from a traditional monolithic architecture to a microservices based one [1] [2].
> _“By 2022, 90% of All New Apps Will Feature Microservice Architectures” [3]_

While Amazon and Netflix are different in terms of the services they provide, they both faced the same issue; how to maintain the scalability and maintainability of a massive online service while also providing the same or better levels of quality to their customers. In both situations the adaptation of a microservice architecture and migrating to a cloud infrastructure was key to their success, apart from Amazon who instead took the opportunity to create their own cloud infrastructure to migrate to, seen today in the form of Amazon Web Services (AWS).

## So what is a Microservice?

“Microservices are small, autonomous services that work together.” [4] A microservices architecture breaks a large complex system down into small independent applications that each fulfil a single service or functionality. Although this architectural style has gained a lot of popularity in recent years under the guise of microservices it is not a new idea, the origin of the architecture is the service-oriented architecture (SOA). SOA emerged in the late 1990s [5] as an approach to enterprise-wide system development in which a large system was broken down into smaller independent applications, which fulfilled a single business function. These independent applications contain the code required to carry out their specific business functionality including data integrations.

Microservices can be seen as taking SOA one step further and breaking down these independent applications again into multiple smaller applications that focus on a specific part of the overall business functionality.

![SOA vs Microservice Architecture](https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZHuCp72QFON7eszzLmdGNw.png)

##### SOA vs Microservice Architecture


Microservices when fully leveraged can offer many benefits to developers such as independent scalability, elasticity and cost reduction. What this means in plain language is that each service instance can be scaled up and down to meet demand and with a cost reduction as compared to scaling a monolithic application or even a single application in terms of a SOA system. There are many benefits to using microservices such as the ability to diversify your technology stack. By this I mean each service can be built using a different programming language or framework once it has support for your chosen communication protocols such as HTTP/REST. This opportunity to diversify the technology stack between services allows developers to choose a language or framework that best meets the requirements of the service, without having to metaphorically fit a square peg in a round hole by using a framework that does not natively support the required features.

> TLDR/TLDU: I like to think of microservices in terms of a business, it can be broken down into seperate departments like R&D, Marketing and HR. Each of these departments all work together as part of the same business but they all provide different services. While each of these departments all do different jobs they still rely on each other to work and need to be able to communicate with each other effectively just like a microservice.

## How does it work in practice?

Ok so now you know a little bit about what a microservice is but how does this all work in practice? In practice each microservice can be deployed as a container or POD in a Kubernetes cluster. If you want to know more about containers have a read of my other [ article](https://medium.com/geekculture/a-beginners-guide-to-understanding-docker-99f704436850)  here which covers the basics of containers and Docker.

Kubernetes allows us to easily create multiple instances of a service by scaling it up to meet any increases in demand and when the demand is gone? We can easily scale it down again so that we are not paying anymore for hosting than we require. This is a much easier way of scaling up our web services when compared to trying to scale up an entire monolithic service, which would require a lot more resources to create more instances of instead of an individual microservice.

## Wrapping up

I hope that this article helps some of you to understand a little more about microservices and the benefits they can bring with them. If you find anything that is incorrect or misleading in the article go ahead and let me know what it is so I can learn from it! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback.
If you enjoyed the article consider subscribing for updates on my future articles, also if you are not already a member on Medium you can join using my [membership link](https://n-murray.medium.com/membership)

## References

- [1]: ^Netflix, “Completing the Netflix Cloud Migration,” Netflix, [Online]. Available: https://about.netflix.com/en/news/completing-the-netflix-cloud-migration. [Accessed 06 02 2021].

- [2]: ^S. M. F. III, “The New Stack,” The New Stack, 08 10 2015. [Online]. Available: https://thenewstack.io/led-amazon-microservices-architecture/. [Accessed 06 02 2021].

- [3]:  ^International Data Corporation (IDC), “IDC FutureScape: Worldwide IT Industry 2019 Predictions,” IDC Corporate USA, Framingham, 2018.

- [4]: ^K. Bakshi, “Microservices-based software architecture and approaches,” in 2017 IEEE Aerospace Conference, Big Sky, MT, USA, 2017.

- [5]: ^IBM Cloud Team, “SOA vs. Microservices: What’s the Difference?,” IBM, 02 09 2020. [Online]. Available: https://www.ibm.com/cloud/blog/soa-vs-microservices. [Accessed 13 02 2021].