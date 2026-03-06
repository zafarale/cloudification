---
title: "Classes and Objects"
description: "The building blocks of Java — defining classes, creating objects, and understanding constructors"
order: 4
duration: 10
tags: ["oop", "classes", "objects", "constructors"]
sharedConcepts: ["oop-basics"]
---

Java is fundamentally object-oriented. Everything you build is organised into classes — blueprints that define data and behaviour — and objects, which are instances of those blueprints.

## Defining a Class
```java
public class Car {
    // Fields — the data a Car holds
    String make;
    String model;
    int year;
    boolean running;

    // Constructor — called when creating a new Car
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.running = false;
    }

    // Methods — the behaviour a Car has
    public void start() {
        running = true;
        System.out.println(make + " " + model + " started.");
    }

    public void stop() {
        running = false;
        System.out.println(make + " " + model + " stopped.");
    }

    public String getInfo() {
        return year + " " + make + " " + model;
    }
}
```

## Creating Objects
```java
Car myCar = new Car("Toyota", "Corolla", 2022);
Car anotherCar = new Car("Ford", "Mustang", 2023);

myCar.start();
System.out.println(myCar.getInfo());
```

## Access Modifiers

Control what other classes can see and use:

| Modifier | Accessible from |
|---|---|
| `public` | Anywhere |
| `private` | Only within this class |
| `protected` | This class and subclasses |
| _(none)_ | Same package only |

The golden rule: make fields `private` and expose them through methods. This is **encapsulation**.
```java
public class BankAccount {
    private double balance;  // nobody can touch this directly

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
}
```

## The this Keyword

`this` refers to the current object instance. Use it to disambiguate when a parameter has the same name as a field:
```java
public Car(String make, String model, int year) {
    this.make = make;   // this.make = field, make = parameter
    this.model = model;
    this.year = year;
}
```

## Static Members

`static` fields and methods belong to the class itself, not any individual instance:
```java
public class Counter {
    private static int count = 0;  // shared across all instances

    public Counter() {
        count++;
    }

    public static int getCount() {
        return count;
    }
}

Counter a = new Counter();
Counter b = new Counter();
System.out.println(Counter.getCount()); // 2
```