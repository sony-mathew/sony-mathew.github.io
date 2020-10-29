---
title: 'RubyGem: Compare YML'
description: 'A Ruby gem to compare YAML or JSON files to find the diff in the keys (with support extending to deeply nested key comparisons).'
date: '2019-04-09'
author: Sony Mathew
readingTime: 3
categories: ['Rubygem']
tags: ['ruby-gem', 'compare-yml', 'compare-json', 'I18n', 'yml-diff', 'json-diff']
---

This library is used to compare two YAML or JSON files to see the differences in keys of both files. This library extends the supports to the comparison of deeply nested keys too.

# Motivation
In most of the projects, the problems that comes with internationalization `I18n` is not a day to day one. When it  comes, it's a tedious and time consuming one with lot of manual work. Most of the time, developers add the keys in primary language translation file `(en.yml)` and leave the rest of language translations stale.

When a customer reports the inconsistencies in the translation, the tedious boring manual work of comparing these keys and finding out which translations are missing for what all languages is trusted into the hands of an unlucky developer by the Product Manager. This tool is a way to escape those situations with a bunch of commands and to enjoy rest of your day in peace.


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'compare-yml'
```

And then execute:

    bundle install

Alternatively, you can just run the following in the terminal:

    gem install compare-yml

This should install compare-yml gem in your system.

## Usage

The usage of this gem is pretty simple. You don't need to have this in your gemfile to use this. An executable is already included.

So after doing installing the gem, you can directly type in 

```
compare_yml source_file target_file
```
in your terminal/command-prompt.

This library is designed to work with comparing both yaml and json files. An example usage in a rails translation situation would be: 

```
compare_yml config/locales/en.yml config/locales/de.yml
```

This will show you the keys which are missing from `en.yml` compared to `de.yml` and vice versa. The comparision is two way meaning, we will compare `en.yml` keys with respect to `de.yml` keys and also compare `de.yml` keys with respect to `en.yml`.

An example usage for people using translation in react app would be :

```
compare_yml locales/fr.json locales/en.json
```

You can use this for comparing translation files, as well as for any yml or json files for that matter. Do not get fooled by the examples.

# References
Source code : [Github - sony-mathew/compare-yml](https://github.com/sony-mathew/compare-yml)   
Published versions: [RubyGems.org - compare-yml](https://rubygems.org/gems/compare-yml/)
