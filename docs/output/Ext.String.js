Ext.data.JsonP.Ext_String({"tagname":"class","name":"Ext.String","autodetected":{"members":true},"files":[{"filename":"String.js","href":"String2.html#Ext-String"}],"singleton":true,"members":[{"name":"escapeRe","tagname":"property","owner":"Ext.String","id":"property-escapeRe","meta":{"private":true}},{"name":"escapeRegexRe","tagname":"property","owner":"Ext.String","id":"property-escapeRegexRe","meta":{"private":true}},{"name":"formatRe","tagname":"property","owner":"Ext.String","id":"property-formatRe","meta":{"private":true}},{"name":"trimRegex","tagname":"property","owner":"Ext.String","id":"property-trimRegex","meta":{"private":true}},{"name":"capitalize","tagname":"method","owner":"Ext.String","id":"method-capitalize","meta":{}},{"name":"ellipsis","tagname":"method","owner":"Ext.String","id":"method-ellipsis","meta":{}},{"name":"escape","tagname":"method","owner":"Ext.String","id":"method-escape","meta":{}},{"name":"escapeRegex","tagname":"method","owner":"Ext.String","id":"method-escapeRegex","meta":{}},{"name":"format","tagname":"method","owner":"Ext.String","id":"method-format","meta":{}},{"name":"htmlDecode","tagname":"method","owner":"Ext.String","id":"method-htmlDecode","meta":{}},{"name":"htmlEncode","tagname":"method","owner":"Ext.String","id":"method-htmlEncode","meta":{}},{"name":"leftPad","tagname":"method","owner":"Ext.String","id":"method-leftPad","meta":{}},{"name":"repeat","tagname":"method","owner":"Ext.String","id":"method-repeat","meta":{}},{"name":"toggle","tagname":"method","owner":"Ext.String","id":"method-toggle","meta":{}},{"name":"trim","tagname":"method","owner":"Ext.String","id":"method-trim","meta":{}},{"name":"urlAppend","tagname":"method","owner":"Ext.String","id":"method-urlAppend","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Ext.String","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/String2.html#Ext-String' target='_blank'>String.js</a></div></pre><div class='doc-contents'><p>A collection of useful static methods to deal with strings.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-escapeRe' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-property-escapeRe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-property-escapeRe' class='name expandable'>escapeRe</a> : <a href=\"#!/api/RegExp\" rel=\"RegExp\" class=\"docClass\">RegExp</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>/(&#39;|\\\\)/g</code></p></div></div></div><div id='property-escapeRegexRe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-property-escapeRegexRe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-property-escapeRegexRe' class='name expandable'>escapeRegexRe</a> : <a href=\"#!/api/RegExp\" rel=\"RegExp\" class=\"docClass\">RegExp</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>/([-.*+?^${}()|[\\]\\/\\\\])/g</code></p></div></div></div><div id='property-formatRe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-property-formatRe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-property-formatRe' class='name expandable'>formatRe</a> : <a href=\"#!/api/RegExp\" rel=\"RegExp\" class=\"docClass\">RegExp</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>/\\{(\\d+)\\}/g</code></p></div></div></div><div id='property-trimRegex' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-property-trimRegex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-property-trimRegex' class='name expandable'>trimRegex</a> : <a href=\"#!/api/RegExp\" rel=\"RegExp\" class=\"docClass\">RegExp</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>/^[\\x09\\x0a\\x0b\\x0c\\x0d\\x20\\xa0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]+|[\\x09\\x0a\\x0b\\x0c\\x0d\\x20\\xa0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]+$/g</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-capitalize' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-capitalize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-capitalize' class='name expandable'>capitalize</a>( <span class='pre'>string</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Capitalize the given string. ...</div><div class='long'><p>Capitalize the given string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-ellipsis' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-ellipsis' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-ellipsis' class='name expandable'>ellipsis</a>( <span class='pre'>value, length, word</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length. ...</div><div class='long'><p>Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The string to truncate.</p>\n</div></li><li><span class='pre'>length</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The maximum length to allow before truncating.</p>\n</div></li><li><span class='pre'>word</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><div class='sub-desc'><p><code>true</code> to try to find a common word break.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The converted text.</p>\n</div></li></ul></div></div></div><div id='method-escape' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-escape' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-escape' class='name expandable'>escape</a>( <span class='pre'>string</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Escapes the passed string for ' and . ...</div><div class='long'><p>Escapes the passed string for ' and .</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The string to escape.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The escaped string.</p>\n</div></li></ul></div></div></div><div id='method-escapeRegex' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-escapeRegex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-escapeRegex' class='name expandable'>escapeRegex</a>( <span class='pre'>string</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Escapes the passed string for use in a regular expression. ...</div><div class='long'><p>Escapes the passed string for use in a regular expression.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-format' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-format' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-format' class='name expandable'>format</a>( <span class='pre'>string, values</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens. ...</div><div class='long'><p>Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each\ntoken must be unique, and must increment in the format {0}, {1}, etc.  Example usage:</p>\n\n<pre><code>var cls = 'my-class',\n    text = 'Some text';\nvar s = <a href=\"#!/api/Ext.String-method-format\" rel=\"Ext.String-method-format\" class=\"docClass\">Ext.String.format</a>('&lt;div class=\"{0}\"&gt;{1}&lt;/div&gt;', cls, text);\nalert(s); // '&lt;div class=\"my-class\"&gt;Some text&lt;/div&gt;'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The tokenized string to be formatted.</p>\n</div></li><li><span class='pre'>values</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>...<div class='sub-desc'><p>First param value to replace token <code>{0}</code>, then next\nparam to replace <code>{1}</code> etc.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The formatted string.</p>\n</div></li></ul></div></div></div><div id='method-htmlDecode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-htmlDecode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-htmlDecode' class='name expandable'>htmlDecode</a>( <span class='pre'>value</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Convert certain characters (&amp;, &lt;, >, and \") from their HTML character equivalents. ...</div><div class='long'><p>Convert certain characters (&amp;, &lt;, >, and \") from their HTML character equivalents.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The string to decode.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The decoded text.</p>\n\n</div></li></ul></div></div></div><div id='method-htmlEncode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-htmlEncode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-htmlEncode' class='name expandable'>htmlEncode</a>( <span class='pre'>value</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Convert certain characters (&amp;, &lt;, >, and \") to their HTML character equivalents for literal display in web pages. ...</div><div class='long'><p>Convert certain characters (&amp;, &lt;, >, and \") to their HTML character equivalents for literal display in web pages.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The string to encode.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The encoded text.</p>\n\n</div></li></ul></div></div></div><div id='method-leftPad' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-leftPad' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-leftPad' class='name expandable'>leftPad</a>( <span class='pre'>string, size, [character]</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Pads the left side of a string with a specified character. ...</div><div class='long'><p>Pads the left side of a string with a specified character.  This is especially useful\nfor normalizing number and date strings.  Example usage:</p>\n\n<pre><code>var s = <a href=\"#!/api/Ext.String-method-leftPad\" rel=\"Ext.String-method-leftPad\" class=\"docClass\">Ext.String.leftPad</a>('123', 5, '0');\nalert(s); // '00123'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The original string.</p>\n</div></li><li><span class='pre'>size</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The total length of the output string.</p>\n</div></li><li><span class='pre'>character</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>The character with which to pad the original string (defaults to empty string \" \").</p>\n<p>Defaults to: <code></code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The padded string.</p>\n</div></li></ul></div></div></div><div id='method-repeat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-repeat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-repeat' class='name expandable'>repeat</a>( <span class='pre'>pattern, count, sep</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns a string with a specified number of repetitions a given string pattern. ...</div><div class='long'><p>Returns a string with a specified number of repetitions a given string pattern.\nThe pattern be separated by a different string.</p>\n\n<pre><code>var s = <a href=\"#!/api/Ext.String-method-repeat\" rel=\"Ext.String-method-repeat\" class=\"docClass\">Ext.String.repeat</a>('---', 4); // '------------'\nvar t = <a href=\"#!/api/Ext.String-method-repeat\" rel=\"Ext.String-method-repeat\" class=\"docClass\">Ext.String.repeat</a>('--', 3, '/'); // '--/--/--'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>pattern</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The pattern to repeat.</p>\n</div></li><li><span class='pre'>count</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The number of times to repeat the pattern (may be 0).</p>\n</div></li><li><span class='pre'>sep</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>An option string to separate each pattern.</p>\n</div></li></ul></div></div></div><div id='method-toggle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-toggle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-toggle' class='name expandable'>toggle</a>( <span class='pre'>string, value, other</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Utility function that allows you to easily switch a string between two alternating values. ...</div><div class='long'><p>Utility function that allows you to easily switch a string between two alternating values.  The passed value\nis compared to the current string, and if they are equal, the other value that was passed in is returned.  If\nthey are already different, the first value passed in is returned.  Note that this method returns the new value\nbut does not change the current string.</p>\n\n<pre><code>// alternate sort directions\nsort = <a href=\"#!/api/Ext.String-method-toggle\" rel=\"Ext.String-method-toggle\" class=\"docClass\">Ext.String.toggle</a>(sort, 'ASC', 'DESC');\n\n// instead of conditional logic:\nsort = (sort == 'ASC' ? 'DESC' : 'ASC');\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The current string.</p>\n</div></li><li><span class='pre'>value</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The value to compare to the current string.</p>\n</div></li><li><span class='pre'>other</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The new value to use if the string already equals the first value passed in.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-trim' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-trim' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-trim' class='name expandable'>trim</a>( <span class='pre'>string</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Trims whitespace from either end of a string, leaving spaces within the string intact. ...</div><div class='long'><p>Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:</p>\n\n<pre class='inline-example '><code>var s = '  foo bar  ';\nalert('-' + s + '-'); // alerts \"-  foo bar  -\"\nalert('-' + <a href=\"#!/api/Ext.String-method-trim\" rel=\"Ext.String-method-trim\" class=\"docClass\">Ext.String.trim</a>(s) + '-'); // alerts \"-foo bar-\"\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The string to escape</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The trimmed string</p>\n</div></li></ul></div></div></div><div id='method-urlAppend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.String'>Ext.String</span><br/><a href='source/String2.html#Ext-String-method-urlAppend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.String-method-urlAppend' class='name expandable'>urlAppend</a>( <span class='pre'>url, string</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Appends content to the query string of a URL, handling logic for whether to place\na question mark or ampersand. ...</div><div class='long'><p>Appends content to the query string of a URL, handling logic for whether to place\na question mark or ampersand.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The URL to append to.</p>\n\n</div></li><li><span class='pre'>string</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The content to append to the URL.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The resulting URL.</p>\n\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});