v-scroll-sync
=============

v-scroll-sync is a vue directive, `v-scroll-sync`, that lets you keep the
scroll positions of multiple elements in sync.

Getting Started
---------------

Install via NPM (or yarn or such):

```
$ npm install v-scroll-sync
```

Import it in your code (or `require` it):

```
import Vue from 'vue';
import VScrollSync from 'v-scroll-sync';
Vue.use(VScrollSync);
```

Usage
-----

The most basic usage is like this:

```
<div v-scroll-sync> ... </div>
<div v-scroll-sync> ... </div>
```

If you add this on two scroll elements, it'll keep the percentage scrolled in
each direction in sync across all elements with this directive.

You can optionally specify name the group, in case you need multiple groups:

```
<div v-scroll-sync:groupname> ... </div>
<div v-scroll-sync:groupname> ... </div>
<div v-scroll-sync:anothergroup> ... </div>
<div v-scroll-sync:anothergroup> ... </div>
```

The directive also supports two modifiers, `.x` and `.y`, which can be used to
only synchronize scrollLeft or scrollTop respectively:

```
<div v-scroll-sync.x> ... </div>
<div v-scroll-sync:foobar.x> ... </div>
```

Lastly, if you want to do something totally custom, you can set the directive's
value to your own function:

```
<div v-scroll-sync:madness="(el, target) => target.scrollTop = el.scrollLeft"> ... </div>
<div v-scroll-sync:madness="(el, target) => target.scrollLeft = el.scrollTop"> ... </div>
```
