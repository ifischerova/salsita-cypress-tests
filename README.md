### Salsita cypress tests 
This repository contains the solution for homework I got during my job application process

The test scenario is the following:
The test script shall
  ** Start **
      - start the browser and open https://salsita-qa-homework.netlify.app/
  ** Main Page **
      - click the Enter button -- "code" page loads
  ** Code Page **
      - on the code page: find a "secret" input element and enter its value into the input field
      - ensure that the "robot" checkbox is checked
      - submit the form -- "lists" page loads (list of famous quotes)
  ** Lists Page **
      On this page there are quote categories "Famous Quotes" and "Awesome Quotes",
      each having several quotes. Each quote has a score number in parentheses.
      At the bottom there is a "Total score" number.
      The texts (category names and quotes in each category) are always the same,
      however they are presented in random order. The score numbers are volatile.
      The test script shall:
      - verify that all the categories and their quotes are displayed. No extra quotes, no missing ones.
      - verify that the "Total score:" is the sum of all quote scores