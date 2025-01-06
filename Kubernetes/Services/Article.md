### A Beginners Guide to Understanding Kubernetes: Services

#### A beginner-friendly overview of services in Kubernetes and the different types you may encounter.

![](https://cdn-images-1.medium.com/max/800/1*nOwzQBOPoGEds5aU-NiErw.png)

A Beginners Guide to Understanding Kubernetes Services.

#### Introduction

Using Kubernetes, we can deploy multiple applications and each of those can have multiple instances. But how do we communicate with those applications without the need to keep track of each application and its many instances? You may have guessed this already based on the title of the article, but for those of you running in a low-power mode; the solution is Kubernetes services.

Services allow us to use one single interface for all application traffic and have it automatically balanced across its multiple Pod instances. They will also keep track of each application instance, aka backends; and will stop forwarding traffic to any instance that is no longer ready to accept traffic or will start forwarding traffic to new instances that have been newly created. You can [check out my previous article on different workload resources in Kubernetes](https://medium.com/geekculture/a-beginners-guide-to-understanding-kubernetes-workload-resources-dc5cc3523354) if you want to understand more about how or why we might have new instances of Pods.

There are a few different types of services within Kubernetes and each of those can be customised using different configurations to meet your specific requirement but in this article, I will be focusing on the basic service types and how and when to use them.

---

#### The basics

Services in Kubernetes generally use selectors to identify which Pods are valid backends for traffic it receives. This is a very simple and effective method of finding the correct Pods and it works by defining a selector to look for specific labels on each Pod when looking for valid backends. These labels could be something as simple as “**app: MySuperApp**”, once both the Pod and the selector have the same label the service should find it. This label selector functionality is similar to how many other things work in Kubernetes such as Deployments to identify its Pod instances.

A basic example of a Kubernetes Service and related Pod

In the above code snippet I have defined a basic Service and a Pod to show how the two work together. In the service definition, you can see on lines 6–7 that we are defining our label selector and telling it to look for a label of “**app: backend**”. This tells the selector to look for our Pod using that label, which we have added on lines 18–19.

In our service above we are defining what ports to listen on and where to send that traffic (lines 8–12). In this port definition, we are setting the protocol to TCP but we could also use UDP or SCTP [1] depending on our application requirements. We are also setting the “**port”** value to 80, this is where we tell the service what port to listen on and the “**targetPort**” value is the port on which the Service should forward the traffic. You will notice that our “**targetPort**” value is “**api**”, this is the name of the port on our Pod that it should send the traffic to however, it could also have been an integer value. Using a name instead of an integer for the port allows the port number to change in the Pod definition and not impact the service definition once the name remains the same.

![](https://cdn-images-1.medium.com/max/800/1*XYoOfNFIjsoVDkcfHY06xA.png)

High level description of service functionality.

In our example service, we have only defined one port but can easily define multiple ports in the same manner. They can be the same or a different protocol. An example of how this can be done is shown in the below code snippet

A basic Kubernetes Service definition with multiple ports

To contact our services from within the cluster via a Pod we can generally use a combination of the hostname (the service name) and port, from our example above this could be something like this “**http://backend-service:80**” but we can also include the namespace in the URL if you want to be extra specific e.g “**http://backend-service.my-namespace:80**”

There are cases where we can define a service without using selectors when we want to use a Kubernetes service as an interface to an external service such as a database or some other non-cloud application. This is useful as it allows the external service to be looked up on the Kubernetes DNS and found by applications in our cluster. When creating Services this way you should also define the endpoints or hostname so the service knows how to find your external service. [2]

#### ClusterIP: the default type

A ClusterIP service is mainly used for internal cluster communication and is assigned a cluster IP address. Although these services are mostly for internal traffic they can be exposed to external traffic by configuring an Ingress or Gateway. Using just one [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) we can expose multiple services based on a set of routing rules.

A service of type ClusterIP is the default service type and is what our previous examples would have been because we did not explicitly define the type of service we wanted. If you want to explicitly define what service type you can do it by adding the “**type: ClusterIP**” configuration to the definition, like in the example below.

A basic Kubernetes service of type ClusterIP.

#### NodePort: Externally accessible via the Nodes

A service of type NodePort is accessible externally by using the IP address of one of your cluster’s nodes. This implies the chosen node would need to have an externally accessible IP address.   
As you may have guessed by the name these services work by assigning a designated port on each node in the cluster to your service. The port number can be chosen manually or automatically. Once your services traffic is received by the node it will be forwarded to any of the active service backends, even if it is on a different node. Additionally, just like the ClusterIP services NodePort services will also be given a cluster IP address.

These types of services can be useful when you need to implement a custom loadbalancing solution or have restricted network resources and need to use a node IP address directly.

A basic service of type NodePort

In the above code snippet you can see the only differences when compared to our ClusterIP service is the different type on line 8 and the addition of the optional “**nodePort**” key on line 14.

#### LoadBalancer: Externally accessible via an external loadbalancer

In clusters with an external or network loadbalancer, such as [MetalLB](https://metallb.netlify.app/); you can use the service type of LoadBalancer.

A LoadBalancer service is accessible externally by using an IP address that has been assigned via the external loadbalancer. Just like a NodePort service a LoadBalancer service will also receive a cluster IP and a designated node port. In effect the LoadBalancer service is very similar to the NodePort service however it does not require any custom loadbalancing solution and instead uses the solution already installed in the cluster, if one exists.

A basic service of type LoadBalancer.

In the above code snippet we can see how to define a service of type LoadBalancer, again it is very similar to what we have seen in the previous examples except for the value of “**type**” on line 11 and the addition of an annotation on lines 6–7. The annotation is an example of how we can manually choose an IP address to be assigned to the service by the external loabalancer, the exact annotation will differ based on your loadbalancing solution. If we do not manually choose an IP via an annotation, our service should be assigned one automatically from the address range configured in the external loadbalancer.

#### ExternalName: a selectorless service for hostnames

The final type of service is an ExternalName service. This type of service can be used to define a Kubernetes service that forwards traffic to an external application via a hostname. An ExternalName service does not require selectors since it does not forward traffic to internal Pods.

This type of service could be used to abstract the external service away from our application. The external hostname could change but the Kubernetes service name will remain the same leading to fewer updates across our application. Below is an example of an ExternalName service

A basic service of type ExternalName.

---

### Wrapping up

In this article, we covered the service types available in Kubernetes and discussed their differences and how they can be used.

This was by no means an exhaustive list or explanation of service configurations in Kubernetes however as the article title intended this is a beginner’s guide, and as such if you are a beginner I hope this article has helped you.

If you find anything misleading or incorrect in this article please take the time to comment and educate me on where I am wrong so I can update it and learn from it.

Finally, if you enjoyed the article consider [subscribing](https://n-murray.medium.com/subscribe) for updates on my future articles, also if you are not already a member of Medium you can join using [my membership link](https://n-murray.medium.com/membership).

---

#### References

[1] ^ [https://kubernetes.io/docs/reference/networking/service-protocols/](https://kubernetes.io/docs/reference/networking/service-protocols/)

[2] ^ [https://kubernetes.io/docs/concepts/services-networking/service/#services-without-selectors](https://kubernetes.io/docs/concepts/services-networking/service/#services-without-selectors)

[3] [https://kubernetes.io/docs/concepts/services-networking/service/](https://kubernetes.io/docs/concepts/services-networking/service/)