---
layout: 'layouts/setlist.html'
pagination:
    data: setlists
    size: 1
    alias: setlist
permalink: 'setlists/{{ setlist.artist.name | slug }}-{{ setlist.eventDate | slug }}/'
eleventyComputed:
  title: '{{ setlist.artist.name }} - {{ setlist.venue.name }}'
---

[{{ setlist.url }}]({{ setlist.url }})