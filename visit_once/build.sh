#!/bin/sh

rm package.zip
jsmin <visit_once.js> visit_once.min.js "Kenny Zhao"
zip package.zip manifest.js visit_once.js
