 
define([
    "corpus/letters",
    "corpus/simple_words",
    "corpus/long_words",
    "corpus/sentences",
    "corpus/qtw",
    "corpus/ruy"
], function(letters, simple_words, long_words, sentences, qtw, ruy){ 
    return {
        "list": [letters, simple_words, long_words, sentences, qtw, ruy]
    };
});