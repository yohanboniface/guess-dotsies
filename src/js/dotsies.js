// In demo/myModule.js (which means this code defines
// the "demo/myModule" module):
 
define([
    "dojo/dom",
    "dojo/on",
    "dojo/ready",
    'dijit/form/Select',
    'dijit/form/SimpleTextarea',
    'corpus/corpus'
], function(dom, on, ready, Select, SimpleTextarea, corpus){


    ready(function(){
        var guess_form = dom.byId('guess_form');
        var guess_what = dom.byId('guess_what');
        user_guess = dijit.byId('user_guess');
        var user_score_div = dom.byId('user_score');
        var result_div = dom.byId('result');
        var user_score = 0;
        var user_level = "simple_words";
        var user_attempts = 0;
        var corpus_choice_form = dom.byId('corpus_choice_form');
        var user_corpus_form = dom.byId('user_corpus_form');
        var corpus_select_widget_options = function() {
            options = Array()
            for(var i=0; i<corpus.list.length; i++) {
                options[i] = {
                    'label': corpus.list[i].name,
                    'value': i
                }
            }
            return options
        }
        var options = corpus_select_widget_options()
        var corpus_choice = new Select({
            'name': 'corpus_choice',
            'options': options
        }).placeAt(corpus_choice_form);
        var user_corpus_widget = new SimpleTextarea({
            'name': 'user_corpus',
            'placeholer': 'xxx', // Do not work, see ticket 11145
            'rows': 4
        }).placeAt(user_corpus_form);
        user_corpus_widget.set('placeholder', "Paste here the words or sentences you want to use. One per line.");
        var validate_guess = function () {
            /*
            * Is the entered text correct?
            */
            var guess_what_content = guess_what.innerHTML;
            var user_guess_content = user_guess.get('value');
            return user_guess_content == guess_what_content;
        }
        var get_corpus = function() {
            var elements;
            var user_corpus_content = user_corpus_widget.value;
            if(user_corpus_content != "") {
                elements = user_corpus_content.split('\n');
            }
            else {
                elements = corpus.list[corpus_choice.get('value')].elements;
            }
            return elements
        }
        var init_guess = function() {
            var elements = get_corpus();
            var i = Math.random();
            i = elements.length * i;
            i = Math.floor(i);
            guess_what.innerHTML = elements[i];
        }
        on(guess_form, "submit", function(evt){
            result_div.innerHTML = "";
            user_attempts ++;
            if (validate_guess()) {
                init_guess();
                result_div.innerHTML = "ok!";
                user_score ++;
            }
            else {
                result_div.innerHTML = "Try again!";            
            }
            user_guess.set('value', "");
            user_score_div.innerHTML = user_score + " / " + user_attempts;
        });
        on(corpus_choice, "change", function(evt) {
            init_guess();
        });
        on(user_corpus_widget, "change", function(evt) {
            init_guess();
        });
        init_guess();
    });
 
    return {};
});