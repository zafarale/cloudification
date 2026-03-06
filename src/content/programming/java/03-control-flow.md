---
title: "Control Flow"
description: "if, switch, loops, and how to direct program execution in Java"
order: 3
duration: 7
tags: ["control-flow", "loops", "conditionals"]
---

Control flow determines the order in which your code executes. Java gives you a familiar set of tools — conditionals, loops, and switches — with a few modern additions worth knowing.

## if / else if / else
```java
int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
```

## Switch Expressions (Java 14+)

The traditional `switch` statement is verbose and error-prone. The modern switch expression is cleaner:
```java
String day = "MONDAY";

String type = switch (day) {
    case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Unknown";
};
```

Note the `->` arrow syntax — no fall-through, no `break` needed.

## for Loop
```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

## Enhanced for Loop (for-each)

Use this whenever you're iterating over a collection or array — it's cleaner and less error-prone:
```java
String[] languages = {"Java", "Rust", "Go"};

for (String lang : languages) {
    System.out.println(lang);
}
```

## while and do-while
```java
// while — checks condition before each iteration
int i = 0;
while (i < 3) {
    System.out.println(i);
    i++;
}

// do-while — always runs at least once
int j = 0;
do {
    System.out.println(j);
    j++;
} while (j < 3);
```

## break and continue
```java
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // skip 3
    if (i == 7) break;     // stop at 7
    System.out.println(i);
}
// prints: 0 1 2 4 5 6
```

## Ternary Operator

A compact one-liner for simple conditionals:
```java
int age = 20;
String status = age >= 18 ? "adult" : "minor";
```