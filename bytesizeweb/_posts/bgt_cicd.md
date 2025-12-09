---
title: "A Beginners Guide to Understanding CI/CD"
excerpt: "A high-level overview of Continuous Integration and Delivery, and what it means in plain language understandable by beginners."
coverImage: "https://miro.medium.com/v2/1*f3O_wmT8rPcEJQtrcIDxUQ.png"
date: "2022-02-22"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/1*f3O_wmT8rPcEJQtrcIDxUQ.png"
---
## Introduction

In the modern world of Cloud Native software development, many systems and applications are constantly being developed, tested and delivered multiple times a day. Some of the big-name companies out there have perfected this accelerated development lifecycle and can deploy new code hundreds of times a day like Netflix [1] and even that pales at the numbers achieved by Amazon, which reportedly deploys new code every 11.7 seconds! [2]. So how do they manage to achieve such crazy deployment speeds?

The answer is of course many things, such as the work culture and the developers themselves who are actually writing the code. But, one of the key enablers is the continuous integration and continuous delivery systems that the companies have created to look after their codebases.

---

## Continuous Integration

Continuous Integration, the CI in CI/CD; is the process by which the building, testing and merging of new code to a repository is automated. This automation allows developers to frequently push new code without having to worry about potential application breaking code being introduced as it will be caught by the automated tests. The process of building and testing the code is made easy with project management systems such as [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) , which can automate building and testing.

Although these processes can be automated, the testing is only as effective as the tests that are created by the developers. If the tests do not have enough code coverage, bugs can still slip through into production environments. So there is no getting away from writing those tests!

With a properly set up and functioning CI pipeline, code should only ever be merged to the main branch by the pipeline and not by a human. This of course is not always the case and we can end up with situations that just cannot be handled by automation.

## Continuous Delivery

Continuous Delivery (CD) is the process of integrating or merging the newly built and tested code to a repository or main branch within a repository. This can also include the delivery of new build artifacts or packages, such as new container images to an image repository. CD confusingly also has another related abbreviated meaning which is Continuous Deployment, this is the process of pushing newly delivered code or features to a production environment where they would be usable by customers [3]. For Continuous Deployment to be achieved you must first have a Continuous Delivery system set up and delivering your new software packages in whatever form they may be for your application, such as an image. Not a lot of companies choose to do continuous deployment though, and choose instead to wait until a certain amount of features are delivered until they push out the new version.

## Ok, so how does it actually work?

Although it can seem like CI and CD are two separate things they are usually part of the same system. To put it simply CI is a series of builds and/or tests that are run on your new code, and if it all passes? your prize is CD, by which I mean your code is merged to main and new packages are delivered with your new features in them.

![Simple CICD pipeline](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Y9tRhgBDRzJA2zpCleJRHA.png)

Simple CICD pipeline

In the image above I have outlined a relatively simple CI/CD Pipeline. It all starts off when you push some new code to your Git repository, once the new code is detected by your CI framework it will kick off the pipeline. Your new code will be pulled into a build environment and built, if it is successful your tests will then be run against your new build. If your build or tests do not pass the pipeline will then stop, at this point, an automated email or notification of some sort is usually sent to the repository owner or whoever pushed the new code to update them on the status of the build. If your build is successful, and all your tests pass then your new code is merged to the main branch of your repository and any packages can be delivered.

The example given is of course very straight forward but CI/CD pipelines can get very complex very quickly, take for example this next pipeline.

![A more complex pipeline](https://miro.medium.com/v2/resize:fit:720/format:webp/1*9yXzTr9ynE72lfDkKGVL4g.png)

A more complex pipeline

This repository has two projects in it, one for a frontend and one for a backend. So we have two separate languages, let's say JavaScript and Java. For this, we need separate build jobs and separate test runners. As you can see from the flowchart this is already getting more complex, now take into account that a single pipeline can encompass multiple repositories!

## How can I set it up for myself?

There are multiple systems available that can be used to set up a CI/CD pipeline such as [CircleCI](https://circleci.com/), [GitHub Actions](https://github.com/features/actions) and [Jenkins](https://www.jenkins.io/), depending on the scale of your project and its requirements you can decide what is most suitable for you. If you have a small project and want to get your toes wet in some CI/CD action you can give GitHub Actions a go for FREE! It is free for public GitHub repositories and as of the time of writing this, there are 2000 free minutes on private repositories, which is more than enough! Unless you plan on creating an extremely elaborate pipeline and are pushing new code very regularly. GitHub Actions also has many readily available workflows for building most languages and frameworks in its [marketplace](https://github.com/marketplace?type=actions), which is populated by the community. An Actions workflow takes the form of a YAML file that is placed in your repository within a folder called .github/workflows, they are relatively simple to understand once you get used to them, like all things.

## Wrapping up

I hope you enjoyed this article and it helps some of you to understand CI/CD and the benefits it can bring to the table for your project. Of course, there are much more in-depth articles and guides on CI/CD but as the title says this is for beginners, so I didn’t want to scare anyone off. If you find anything that is incorrect or misleading in the article go ahead and leave a response on the article and educate me! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback.
If you did enjoy the article consider subscribing for updates on my future articles, also if you are not already a member on Medium you can join using my membership link

## References
[1]^https://www.infoq.com/news/2013/06/netflix/

[2]^https://techbeacon.com/app-dev-testing/10-companies-killing-it-devops

[3]^ https://www.redhat.com/en/topics/devops/what-is-ci-cd.