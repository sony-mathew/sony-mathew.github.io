---
title: 'Building a Personal Blog with Next.js and Github Pages'
description: 'The story of a personal blog developed using Next.js, Tailwind CSS and hosted freely using GitHub Pages.'
date: '2021-07-25'
author: Sony Mathew
readingTime: 8
categories: ['Development']
tags: ['software development', 'nextjs', 'github pages', 'blog']
toc: true
---

## The Beginning

The idea of having a personal website was certainly an old one, from the time I started spending time on the internet and social media. During my college days, I used to do gigs in Fiverr pretending to be a hardcore [WordPress](https://wordpress.com/) Developer. Even though I was not at the time, I learned it while doing the gigs. I fully embraced the ideology, fake it till you make it. After learning PHP and having some experience with developing a handful of websites as a freelancer, [WordPress](https://wordpress.com/) became a favorite.

With this familiarity bias, my first option for a personal blog was a free account in [WordPress](https://wordpress.com/). So I did that, long back in 2011 itself. But as soon as created that, I lost interest, I got busy with college, activities, then job, and then totally forgot about this.

## World of Ruby

Then in 2014, I joined Freshworks (then Freshdesk) right out of college and learned this amazing technology called Ruby on Rails. Man, I was high on that for so long. [Ruby](https://www.ruby-lang.org/en/) is an open-source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. The clarity of expressing things in Ruby is unparalleled. [Ruby on Rails](https://rubyonrails.org/) is a framework that sprinkles magic on top of already magical Ruby. So far from what I have heard and read, the only programming language that is associated with the word `Magic` so far is Ruby.

As a junior professional Ruby developer, I decided to create a blog in Ruby on Rails. I went crazy on features. Added this and that and then some more. But it was taking a lot of time and I never felt it was ready for production. So at some point, I lost interest and left it.

## Medium.com

During that time [Medium](https://medium.com/) became popular and most of the people in my circle started writing there. I caved in on [`Medium`](https://medium.com/) wave and gave the idea of the self-hosted blog a rest. I started writing there. I must admit, it was a breeze to write and publish there.

Being a semi-power-user/developer, it did not feel at home. I wanted to change this and that and would have loved to have some JavaScript executed. It's not that I will write JavaScript-related content and requires embedded JavaScript to be executed, it's the idea of freedom to do what you wanted to do if and when you want to do that was powerful. It did not matter whether you will do it or not. I think it resonates at some levels with the current Covid situation. Even though many of us are not avid travelers or go out for fine dining every day or meet friends every day, it's the thought that we could not do it even if wanted that matters.

## Middleman and Jekyll

At some point, this idea popped up again and gained some time of my thoughts. I was back to the original drawing board. This time I decided it to be as minimal as possible. I wanted to run this with minimal maintenance costs in regards to time and money. I took a couple of decisions, in terms of technology, distribution, setup, and hosting.
1. I wanted to have something that I have full control of. I decided to have the codebase in GitHub.
2. The best way to have a minimalist setup is to have a static website. I decided to use a  static website builder.
3. One of the requirements that I ranked higher was that, after the initial setup, I should be able to write and publish new blog posts relatively easy.
4. I was a fan of GitHub Pages. Decided to use this for hosting.

Even though I had matured in my view of programming languages in general, the one I knew well and had a little crush on was still Ruby. So decided to use a tool called the [Middleman App](https://middlemanapp.com/). This is used to build static websites with Ruby. With this, after the initial setup, you could just write a new YML file for a new blog and build it to get the static website.

I started building it and I lost interest while doing the customizations. Scraped whatever I did with Middleman and decided to use yet another Ruby static website builder called [Jekyll](https://jekyllrb.com/). Once again, started building. Felt the adrenaline rush. But that too died soon. I did the basic setup with both and the excitement died when I reached the theming and customization stage. After this short stint, the idea was put to rest for the time being. 

## Covid and the digital creativity

Then the little viruses started attacking the world. The whole world was turned upside down. It was turmoil everywhere. We lost the physical touch with the outside world. Initial days of lockdown and covid were filled with uncertainties and meaning of life kinda thoughts. At some point, some of this subsided and the wonderful people everywhere started pursuing their hobbies. I could see a lot of content creators on almost every social platform that I roamed. The world started to run in different directions. 

During all this time I felt that there are things that I learned that I could share with the world which might be useful for someone who walks a similar path at some point in time. This was a constant thought at the back of my mind, but I felt reluctant to write on other platforms since this idea of a self-hosted blog was kind of a blocker whenever I thought about writing. I jotted down ideas and writing points in a note-taking app and moved on whenever the writing urge struck.

## Next.js, Tailwind CSS and GitHub Pages

With the inspiration drawn from this wave of digital content making, I went back to the idea of a self-hosted blog again. This time, a couple of decisions had changed. I had a glimpse of [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). The initial impression about both of them was just WOW. Decided to try out building the blog with this.

I was afraid that after all the previous failed attempts, I might lose interest on the way and will abandon it. Anyways as you know and as you reading this, that did not happen. Just read through the [Next.js](https://nextjs.org/) documentation and tried out [Tailwind CSS](https://tailwindcss.com/) in a couple of hours. Was able to get to a decent shape in a day. Added few customizations over a couple of days and felt proud. I used [GitHub Pages](https://pages.github.com/) to host [this](https://sony-mathew.github.io) as it was free and works out of the box with the repo in GitHub. I still did not fully feel that this was production-ready (rightly so, as every developer feels 99% of the time about anything that they build). Somehow, the thought of starting small and building one step at a time overpowered the former. So I bought a domain and put it out there.

<img src="/images/posts/building-personal-blog-using-nextjs-and-github-pages/sony-mathew-com.png" />

You can checkout the codebase here: [https://github.com/sony-mathew/sony-mathew.github.io](https://github.com/sony-mathew/sony-mathew.github.io)

Anybody can clone this codebase and make changes to host a personal blog of your own. I will be writing a follow-up article on how to do this.

I urge you to share what you are have learned. This will one day help someone. I assure you something that you think is so simple might be alien to someone else.
