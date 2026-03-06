---
title: "Collections"
description: "ArrayList, HashMap, and the Java Collections Framework for storing and working with data"
order: 5
duration: 9
tags: ["collections", "arraylist", "hashmap", "data-structures"]
---

Java's Collections Framework gives you ready-made data structures for storing and manipulating groups of objects. You'll use these constantly — knowing which one to reach for is a core Java skill.

## ArrayList

A resizable array. Use it when you need an ordered list and fast index-based access.
```java
import java.util.ArrayList;

ArrayList<String> languages = new ArrayList<>();

languages.add("Java");
languages.add("Rust");
languages.add("Go");

System.out.println(languages.get(0));   // Java
System.out.println(languages.size());   // 3

languages.remove("Go");

for (String lang : languages) {
    System.out.println(lang);
}
```

## LinkedList

Better than ArrayList when you frequently insert or remove from the middle of a list:
```java
import java.util.LinkedList;

LinkedList<String> queue = new LinkedList<>();
queue.addLast("first");
queue.addLast("second");
queue.removeFirst();  // acts like a queue
```

## HashMap

Stores key-value pairs. Lookups, inserts, and deletes are O(1) on average.
```java
import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();

scores.put("Alice", 95);
scores.put("Bob", 82);
scores.put("Charlie", 91);

System.out.println(scores.get("Alice"));       // 95
System.out.println(scores.containsKey("Bob")); // true

// Iterate over entries
for (var entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

## HashSet

A collection of unique values — duplicates are automatically ignored:
```java
import java.util.HashSet;

HashSet<String> tags = new HashSet<>();
tags.add("java");
tags.add("backend");
tags.add("java");  // ignored — already exists

System.out.println(tags.size()); // 2
```

## Choosing the Right Collection

| Need | Use |
|---|---|
| Ordered list, fast index access | `ArrayList` |
| Frequent insert/remove in middle | `LinkedList` |
| Key → value lookup | `HashMap` |
| Unique values only | `HashSet` |
| Sorted key → value | `TreeMap` |
| Thread-safe list | `CopyOnWriteArrayList` |

## The List Interface

In practice, declare variables using the interface type rather than the implementation:
```java
// Prefer this
List<String> items = new ArrayList<>();

// Over this
ArrayList<String> items = new ArrayList<>();
```

This makes it easy to swap implementations later without changing the rest of your code.

## Useful Utility Methods
```java
import java.util.Collections;

List<Integer> numbers = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9));

Collections.sort(numbers);           // [1, 1, 3, 4, 5, 9]
Collections.reverse(numbers);        // [9, 5, 4, 3, 1, 1]
int max = Collections.max(numbers);  // 9
```