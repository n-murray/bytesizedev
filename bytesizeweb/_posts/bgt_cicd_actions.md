---
title: "A Beginners Guide to CI/CD with GitHub Actions"
excerpt: "An easily understandable guide to creating your first CI/CD pipeline for your GitHub repository using GitHub Actions."
coverImage: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*TafjEeewhtTd4jspF-mU4w.png"
date: "2022-04-24"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*TafjEeewhtTd4jspF-mU4w.png"
---
## Introduction

In software development, there is one thing that I think most engineers will agree on, automation is great! We should try to automate as many of our tasks as possible to increase our productivity while also reducing our workload. In the modern world of software, the automation of building, testing and deploying our code is becoming the norm and questions and eyebrows are raised if you’re not doing it. The automation of those tasks is normally called continuous integration and continuous delivery or CI/CD for short. There are many tools that you can use to set up your own CI/CD pipeline and they all have their pros and cons, so choosing one really comes down to your project's needs and your budget. Some of the tools you can use are [CircleCI](https://circleci.com/), [GitHub Actions](https://github.com/actions) and [Jenkins](https://www.jenkins.io/), for this article I will be covering GitHub Actions since I have used it before and found the naturally built-in support for GitHub repositories very useful.

If you are not sure about the basics of CI/CD you can check out my [previous article](https://medium.com/geekculture/a-beginners-guide-to-cicd-6a6c0a32cb98) that covers what you need to know to start building up the picture in your head. For this article, I won’t be covering too many of the ideas behind CI/CD but rather how to set it up for your project using GitHub Actions.

---

## Getting Started

### Pre-requisites

    - A GitHub repository

In this article, I will be covering how to create a GitHub Actions workflow that can build and test a Maven project and if it is successful the code will be merged to the main branch of the repository. Even though this workflow will be based on a Maven project it can be easily changed to work for other project types. The project I will be setting my pipeline up for is from one of my [previous articles](https://medium.com/codex/building-your-first-rest-api-java-and-spring-boot-5f3573f59f55), it is a simple Spring Boot project that uses Maven. The completed workflow from this article will be in the repository for that project if you want to check it out.

[https://github.com/n-murray/medium-demos](https://github.com/n-murray/medium-demos)

The first thing you should know about GitHub Actions is that it works on the idea of workflows. A workflow in its simplest description is a YAML file that describes a list of jobs to complete whenever certain criteria are met such as pushing changes to your repository.

## The Pipeline

![Our Actions Workflow](https://miro.medium.com/v2/resize:fit:720/format:webp/1*sqmOf_6L2M1cqUmiV9TR0A.png)

##### Our Actions workflow

In the above diagram, I have outlined the simple CI/CD pipeline that I will be creating in our Actions workflow. There are two main stages in the workflow:

1: Building and testing the changes

2: Merging the changes to the main branch.

It should be obvious from the diagram but just for clarity, stage two, merging the code to the main branch; is only carried out if stage one completes successfully.

You may have already noticed a very important part of our pipeline in the diagram, we will not be pushing our code to the main branch instead we will be working and pushing code to our “development” branch. This is generally a good practice in Git but even more so in a CI/CD controlled repository so we can be sure that only code that passes all our tests and builds successfully is merged to the main branch via our CI/CD pipeline.

* Ideally, there should never be any manual commits to the main branch and it should only be done via a pipeline after passing all testing but unfortunately in the real world, this doesn’t always happen for many reasons. 

## Creating our workflow

To create our workflow open your GitHub repository and click on the Actions tab, this will open a page with lots of suggested Actions for your project based on its contents. I would suggest having a browse through the different Actions available here to get an idea of the different things you can do in your workflow, they aren’t all just CI/CD related either some can do things such as remove stale issues or pull requests. Since I know what I want to create for this article however I will just start with the blank workflow and populate it ourselves. To do this clink on the link at the top of the page that says “set up a workflow yourself”, this link may change over time but I’m sure it will be replaced by something similar.

![Creating our workflow](https://miro.medium.com/v2/resize:fit:720/format:webp/1*82V_PzR5tLS09pp60W4Hiw.png)

##### Creating our own workflow

You should now be presented with a new file creation page, this is where we will add our workflow. You can change the name of this file to whatever you like but I will be naming mine “pipeline.yml” which I think is pretty self-explanatory.

```

name: CICD Pipeline

# Controls when the workflow will run
on:
  # Triggers the workflow on push events but only for the development branch
  push:
    branches: [ development ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build with Maven
        run: mvn clean install --file spring-rest-demo/pom.xml

  merge:
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@main
      - name: Merge development -> main
        uses: devmasx/merge-branch@v1.4.0
        with:
          type: now
          from_branch: development
          target_branch: main
          github_token: ${{ github.token }}
```
##### Our full workflow

The above code is the entire workflow that we will be creating, to replicate the flow given in the diagram shown above. I have given the full file here so that it is easier to copy into your own file to save any issues trying to piece it all together. I will now break it down into smaller chunks and explain what each part is doing.

```
name: CICD Pipeline

# Controls when the workflow will run
on:
  # Triggers the workflow on push events but only for the development branch
  push:
    branches: [ development ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
```

##### Part one of our workflow

The first part of the workflow is giving it a name and setting the parameters that need to be met for the workflow to be triggered and run by Actions. On line one I am naming the workflow “CICD Pipeline”, again a very self-explanatory name.

On line four we are beginning to describe the triggers for the workflow. I think the syntax for this is pretty simple and should hopefully make sense to even the freshest of beginners. It tells Actions to run this workflow whenever there are changes pushed to the development branch. Here we can add multiple branches or other criteria such as when a pull request is made for a specific branch. On line ten we are saying that we also want to be able to trigger this workflow manually.

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build with Maven
        run: mvn clean install --file spring-rest-demo/pom.xml
```


##### Part two of our workflow

This is the second part of our workflow and describes the first job to be run as part of our pipeline. The overall workflow contains two jobs and the second is dependent on this one completing successfully, just as our flow diagram above has laid out for us.

On line one we are starting our “jobs” block which will contain all of our jobs, and on line two we are opening up our first job called “build”. This can be called anything you like and will be used as the jobs ID. Line four tells Actions what type of runner we would like to execute our job on. [A runner](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) is essentially a virtual machine that will be used to copy your clone your code changes onto and execute the commands laid out in our job.

On line four we are opening up our “steps” block which will lay out all of our commands to carry out as part of our job. The steps here can be a combination of ready-made actions workflows that can be imported into our own workflow to save us time. The actions workflows found on GitHub can be created by individuals or by companies, you can even create one yourself for use by others. The first step we are using is the [checkout action](https://github.com/actions/checkout), this checks out our repository and defaults to the change that triggered the workflow and so will checkout our development branch.

The next step of our job (beginning on line 6) is to set up the correct version of Java for our project, since mine is using Java 1.8 I will tell it to use that. We are again using a ready-made action called [setup-java](https://github.com/actions/setup-java), this does exactly what we need and installs and configures the version of Java that we tell it to.

The last step of our build job is to build the Maven project, because we are using Maven this step will also execute our tests if we want it to. In this step, instead of using a ready-made action I am running our own Maven command and pointing it to the correct POM file in our repository. If we wanted to we could split the building and testing of our project into separate steps for clarity but for this small pipeline doing it all at once is sufficient and easy because we are using Maven.

```
merge:
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - uses: actions/checkout@main
    - name: Merge development -> main
      uses: devmasx/merge-branch@v1.4.0
      with:
        type: now
        from_branch: development
        target_branch: main
        github_token: ${{ github.token }}
```

##### Part three of our workflow

In this last part of our workflow, we are describing our second and final job. This job again runs on the same type of runner and depends on the previous job to be successful. We are outlining this dependency on the build job with line three in the Gist.

In this job, we want to merge our newly pushed and tested changes to the main branch of our repository. To do this we will be using two actions, the same checkout action from the build job and a new one called merge-branch. This [merge-branch](https://github.com/devmasx/merge-branch) action does exactly what we want it to, and can be configured to merge our development branch to our main branch now that our changes have been built and tested successfully.

Now that we have our workflow added to the new file we can commit it to the repository so that we can start using it.

## Testing our workflow
To test your new workflow you will need to create a branch called “development” in your repository, or whatever name you put in your workflow. Once you have created this new branch, make some changes and push them up to your new remote branch to kick trigger your workflow.

To check if your workflow was triggered and to also check on its progress you can navigate to the same “Actions” tab used above to create the workflow. On this page, you should now hopefully find a workflow that is running

![My workflows page](https://miro.medium.com/v2/resize:fit:720/format:webp/1*rLOqzgfNm7IZsFVeE91EzQ.png)

##### My workflows page

In the above image you can see the Actions page for my demo repository, on here you can see the existing workflows within the repository on the left and a list of all the previous runs. You can click into any of the runs to check on its progress if it is currently running and also to check on the logs if it is already complete. As can be seen in the image it is successful runs are marked with a green tick and failed runs are marked with a red x. When a run fails you will also receive an email telling you it failed.

If your first workflow completes successfully on your first run I’d suggest pushing up some changes that you know will fail so that you can test the negative flow of the workflow and make sure that the changes are not merged to the main branch.

## Wrapping up
I hope you enjoyed this article and it helps one or two of you get up and running with a GitHub Actions workflow. There are many different ways to set up your own workflows and so many freely available actions to utilise in your workflow. I would suggest having a look around the actions that are available to get an idea of what things you can automate for your project even for things that may not come under CI/CD.

I wrote this and all of my articles as an educational experience for myself as well as others so I welcome constructive feedback. If you enjoyed the article consider subscribing for updates on my future articles.