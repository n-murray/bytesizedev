---
title: "A Beginners Guide to Understanding Inheritance and Polymorphism"
excerpt: "A high-level overview of inheritance and polymorphism in software development in plain language understandable by beginners."
coverImage: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*eldBkgg9MtVHb07880Hemw.png"
date: "2022-04-05"
author:
  name: Nicholas Murray
  picture: "/assets/profile.jpeg"
ogImage:
  url: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*eldBkgg9MtVHb07880Hemw.png"
---
## Introduction

If you are getting started on your path into the world of software development you have probably heard the term Object-Oriented Programming (OOP), within OOP there are a few core concepts that not only define how we should design our software but also help us build in greater flexibility and reusability into our code. Since this article is aimed at beginners I will first try to give an easily understandable primer/refresher on OOP and then I will move on to the two concepts named in the title, Inheritance and Polymorphism.

## So… What is Object-Oriented Programming?

OOP is a software paradigm in which we design our code in a way that we can talk about and treat it as if it was an object in the real world. What this means is that we structure our code in blocks, called classes. Classes are basically the blueprints to create our objects. Using OOP we can refer to our classes using common terms we would use in the physical world such as, that IS A dog or the dog HAS A bone. I like to think about object creation with classes in a similar way to how cookies are created with a cookie cutter. The cookie is cut out and defined by the shape of the cutter, although a class can define much more than just the shape of an object; a class would also define the type of chocolate chips and how you can eat it.

…And with that quick primer let's get into our first core concept of OOP.

## Inheritance

This is exactly like the other kind of inheritance you may have heard of… the kind that comes from parents or other family members. In OOP, a class can inherit some functionality such as member functions or variables from other classes but only when they are extensions of that class. What this means is that instead of starting from scratch we create a class that is built upon an already existing class so that it will inherit all of its existing variables and methods.

Get ready for another food-based and _hopefully_ easily understandable analogy to explain inheritance. Let’s start with a beef burger, just a regular beef patty with no buns. This burger is our base class, it has its own functionality and variables, i.e it can be eaten and tastes great. Now imagine we want to create a new class called Ham Burger, instead of starting from scratch we can extend the base class Burger and keep all the great original features but also adds in new ones such as bread buns and sauce. I’m sure you can already see where this is going but we can extend our Ham Burger class again to create another derived class the Cheese Burger, this uses our Ham Burger as its base class but adds in a new feature called cheese.

Ok, let’s take this analogy and represent it in some code, for this I will use Java since it is built around the idea of OOP.

```
public class Burger {
  public Burger() {}
  
  public void eat() {}
  
  public String toString() {
    return "The Original Burger"
  }
}
```

##### The Burger class

This is our base class, the Burger; it’s pretty basic with no frills, just a burger that we can eat using the eat function. To build upon this class and create our child class, the Ham Burger; we now must extend it and add our extra functionality, the two variables bunType and sauceType, both of which will be strings ( if this was a real class I would prefer to use Enums here).

```
public class HamBurger extends Burger {
  
  public String bunType;
  
  public String sauceType;
  
  public HamBurger(String buns, String sauce) {
    this.bunType = bunType;
    this.sauce = sauce;
  }
  
  public String toString() {
    return "A Hamburger with " + this.bunType + " buns and " + this.sauceType
  }
}
```

##### The HamBurger class

Now that we have our two classes, let's see how to use these two classes and how we can benefit from using inheritance.

```
public static void main(String [] args ) {
  
  Burger burger = new Burger();
  HamBurger hamBurger = new HamBurger();
  
  //Using our base classes method
  burger.eat();
    
  //Our child class can also use the base classes method
  hamBurger.eat();
  
  //But it also has it's own variable 
  System.out.println("Buns: " + hamBurger.bunType);
  System.out.println("Sauce: " + hamBurger.sauceType);
    
  //We can also refer to instances of the child class as instances of the base class
  List<Burger> burgers = new ArrayList();
  burgers.add(burger);
  burgers.add(hamBurger);
    
}
```

##### The Burgers in action

As can be seen in the above block of code we can call methods declared in the base class on instances of the child class. This only works when the method has an access modifier of public or protected as methods and variables with private access modifiers are only usable by the class that they are declared in.

Going back to our burger analogy we can refer to our Ham Burger and Cheese Burger as just a Burger and there would be nothing wrong with it, this is the same as in our code, we can refer to instances of the child class as if it were the base class. This means we can store them together in an array or list and iterate through them. You may have noticed that in the class declarations above both classes have a toString method, I purposely did not mention them until now as they are an example of Polymorphism which is the next core concept.

## Polymorphism
Just as we saw above, using inheritance we can treat child classes as if they were instances of the base class. This allows us to use any class with the same base class in the same way by calling the same methods but with the key difference that the same method can do different things for each of the classes.

What this means is that we can treat any instance of a class or its child classes the same logically in our code while at the same time knowing they are different because the method implementations can have different results. Take for example our two classes above when we call the toString method on an instance of the burger class we will be returned back a string with the following text _“The Original Burger”_, whereas if we call the same method on our hamburger class we will receive a dynamic string which will be populated with the hamburgers instance variables of bunType and sauceType. So for a hamburger with seedy buns and ketchup, we will receive back _“A Hamburger with seedy buns and ketchup”_.

So using polymorphism we can for example have a list of many different objects that are of the same base class and call a common method in them while also getting different results depending on the child classes implementation of that method. We could even take this idea to an extreme and create a list of type [Object, which is the base class for ALL classes in Java](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html) (even the ones you create yourself ) and loop through it calling the [toString method](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html#toString--) on all classes which is a common method inherited from the Object class itself with a default implementation.

To enforce polymorphism in our classes we can use an [abstract class](https://en.wikipedia.org/wiki/Abstract_type) for our base class. An abstract class is a class that is designed to be extended through inheritance by child classes. They can define common methods to be used by their child classes but not actually give them an implementation, these are abstract methods and must be implemented in the child class. Abstract classes can of course also define an implementation for their methods, these are called default methods and do not need to be implemented in the child class _but can be_ if you want to.

## Wrapping up

There is a lot more depth to the above topics and you could write a novel on it, in fact, I’m sure there are plenty of them! But for this article, I did not want to go into too much depth as it is for beginners to simply get a feel for the concepts without having to think too much about it. If you are interested in learning more about inheritance and polymorphism, I would advise looking into [interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/index.html) and how they can add many more layers of functionality to your polymorphic classes.

If you find anything that is incorrect or misleading in the article go ahead and leave a response on the article and educate me! I am writing this as an educational experience for myself as well as others so I welcome constructive feedback. If you enjoyed the article consider subscribing for updates on my future articles, also if you are not already a member on Medium you can join using [my membership link](https://n-murray.medium.com/membership).