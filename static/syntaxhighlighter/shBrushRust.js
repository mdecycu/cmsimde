
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * Rust Brush
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
    // CommonJS
    if (typeof(SyntaxHighlighter) == 'undefined' &&
        typeof(require) != 'undefined')
    {
        SyntaxHighlighter = require('shCore').SyntaxHighlighter;
    }

    function Brush()
    {
        // Rust keywords
        var keywords =
            'as async await break const continue crate dyn else enum extern ' +
            'false fn for gen if impl in let loop match mod move mut pub ref ' +
            'return self Self static struct super trait true type unsafe use ' +
            'where while';

        // Reserved or historical keywords (not ordinary stable keywords)
        var reserved =
            'abstract become box do final macro override priv ' +
            'typeof unsized virtual yield';

        // Rust primitive types
        var datatypes =
            'bool char str i8 i16 i32 i64 i128 isize ' +
            'u8 u16 u32 u64 u128 usize f32 f64';

        // Common standard library types
        var types =
            'String Vec Box Option Result Some None Ok Err ' +
            'Cell RefCell Rc Arc Weak Cow ' +
            'HashMap HashSet BTreeMap BTreeSet ' +
            'VecDeque LinkedList BinaryHeap ' +
            'Path PathBuf OsStr OsString ' +
            'Duration Instant SystemTime ' +
            'Iterator IntoIterator DoubleEndedIterator ExactSizeIterator ' +
            'From Into TryFrom TryInto AsRef AsMut ' +
            'Clone Copy Default Drop Send Sync Sized ' +
            'Fn FnMut FnOnce';

        // Common functions
        var functions =
            'assert assert_eq assert_ne debug_assert debug_assert_eq ' +
            'debug_assert_ne panic todo unimplemented unreachable ' +
            'print println eprint eprintln format format_args ' +
            'write writeln vec drop clone default ' +
            'from into try_from try_into to_string ' +
            'matches include include_str include_bytes ' +
            'concat stringify env option_env file line column ' +
            'module_path cfg cfg_attr compile_error ' +
            'min max abs pow sqrt sin cos';

        // Frequently used macros
        var macros =
            'assert assert_eq assert_ne debug_assert debug_assert_eq ' +
            'debug_assert_ne print println eprint eprintln ' +
            'format format_args write writeln vec panic todo ' +
            'unimplemented unreachable matches include include_str ' +
            'include_bytes concat concat_idents stringify env ' +
            'option_env file line column module_path cfg cfg_attr ' +
            'compile_error thread_local';

        this.regexList = [
            // Comments
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,
              css: 'comments' },

            { regex: SyntaxHighlighter.regexLib.multiLineCComments,
              css: 'comments' },

            // Rust documentation comments
            { regex: /^(\s*\/\/\/.*|\/\/!.*)$/gm,
              css: 'comments' },

            // Rust attributes: #[derive(...)] and #![...]
            { regex: /#!?\[[^\]]*\]/gm,
              css: 'preprocessor' },

            // Raw strings, with up to three # delimiters
            { regex: /(?:br|r)###"[\s\S]*?"###|(?:br|r)##"[\s\S]*?"##|(?:br|r)#"[\s\S]*?"#|(?:br|r)"[\s\S]*?"/gm,
              css: 'string' },

            // Byte strings and ordinary strings
            { regex: /\bb"(?:\\.|[^"\\])*"/gm,
              css: 'string' },

            { regex: /"(?:\\.|[^"\\])*"/gm,
              css: 'string' },

            // Byte characters and character literals
            { regex: /\bb'(?:\\.|[^'\\\n])'/gm,
              css: 'string' },

            { regex: /'(?:\\.|[^'\\\n])'/gm,
              css: 'string' },

            // Lifetimes: 'a, 'static
            { regex: /'[a-zA-Z_][a-zA-Z0-9_]*/gm,
              css: 'color1' },

            // Numeric literals
            { regex: /\b(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?)(?:u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize|f32|f64)?\b/gm,
              css: 'value' },

            // Generic macro invocations: println!, vec!, custom_macro!
            { regex: /\b[a-zA-Z_][a-zA-Z0-9_]*!/gm,
              css: 'functions bold' },

            // Primitive types
            { regex: new RegExp(this.getKeywords(datatypes), 'gm'),
              css: 'color1 bold' },

            // Standard library types and traits
            { regex: new RegExp(this.getKeywords(types), 'gm'),
              css: 'color2 bold' },

            // Common functions and macros
            { regex: new RegExp(this.getKeywords(functions), 'gm'),
              css: 'functions' },

            // Current Rust keywords
            { regex: new RegExp(this.getKeywords(keywords), 'gm'),
              css: 'keyword bold' },

            // Reserved or historical keywords
            { regex: new RegExp(this.getKeywords(reserved), 'gm'),
              css: 'color2' }
        ];

        this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['rust', 'rs'];

    SyntaxHighlighter.brushes.Rust = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
