# Hack School Winter 2020

## What is HTML?
HTML stands for Hypertext Markup Language, and defines the basic structure of any webpage. Different elements are defined by opening and closing tags, and most tags can have other tags inside them. Here are some basic tags that you might use: 

### Paragraph Tag
```html
<p>This is a paragraph tag.</p>
```
Defines paragraph content. Put any regular text in here. 

### Heading Tag
```html
<h1>This is a heading</h1>
<h2>This is another heading</h2>
```
Defines different levels of headings (HTML has 6 in total). 

### Image Tag
```html
<img src="image.jpg" alt="the thing didn't load"></img>
```
Loads in an image. Link to an image is given using the src attribute. Alt text can also be displayed if the image does not load. 

### Hyperlink Tag
```html
<a href="http://acm.ucsd.edu/">Click here to go to ACM's website!</a>
```
Defines a hyperlink. Clicking on the enclosed text will tell the browser to navigate to the link given by the href attribute. 

### Form tag
```html
<form>
  Enter your name: <input type="text"></input>
  <input type="submit" value="Submit"></input>
</form>
```
Defines a form, encapsulating data with all input tags inside. The form data can be sent to another webpage via HTTP request (more on that on part 4 when we talk about APIs).

### Head tag
```html
<head>
  <!-- metadata goes in here -->
</head>
```
Holds any metadata that goes in a webpage. This can include the website title, or any Javascript or CSS that the website requires. 

## HTML Attributes
HTML attributes provide more information about an element using a key-value pair. Above, we mentioned the *src* attribute in the **img** tag, which is used to specify which image we will display. Another important attribute is the *href* attribute, which is important in the **a** tag as it specifies which hyperlink to link to. We will talk about other important attributes below (most important is *class* and *id*).

## CSS
CSS stands for Cascading Style Sheets. Each CSS document contains instructions for how to style different elements in a webpage. We select these elements with what are called "selectors", and we can set different properties for the selected elements.

A typical CSS document would look something like this: 
```css
/* these are selectors! */
h1 {
  font-family: Nunito, "sans-serif";
  background-color: #64bef1;
}

p {
  font-family: Roboto, "sans-serif"; 
}
```
Any HTML document that links to this CSS file will have `<h1>` and `<p>` tags with these attributes. 

### Different Ways of Styling
There are three main ways of styling an HTML document.
- Inline Styling (uses a style attribute in each element to specify)
- Internal Styling (uses the style tag in the head which outlines all the CSS properties)
- External Styling (uses a separate .css file to style the document)

**We will mainly be using external styling to style our document.**

### Selectors 
As shown before, one way of selecting elements is just by indicating the tag name. However, we can limit the elements which we use and specify any particular element in the DOM by describing where the element is in relation to others. A comprehensive list can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), though below are a few examples.

#### Class Selector
Selects elements of the given class. For example, `.hackschool` will select every element with the class attribute set to "hackschool". 

#### ID Selector
Selects elements of the given class. For example, `#navbar` will select every element with the id attribute set to "navbar".

#### Descendant Selector
Simply place the parent element before the child element you want to select. For example, `div img` will select all `<img>` tags inside any `<div>` tag.

#### Direct Descendant Selector
Denoted by a `>` symbol. For instance, `div > img` will only select `<img>` tags that are an immediate child of a `<div>` tag. 
