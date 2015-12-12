//= require froala_editor.min.js
//= require plugins/lists.min.js
//= require plugins/table.min.js
//= require plugins/quote.min.js
//= require languages/es.js

$(document).on('ready page:load', function(){
  var locale = $("meta[name=locale]").attr('content');
  $('textarea.editor').each(function(index, textarea){
    $(textarea).froalaEditor({
      editorClass: "editor-" + $(textarea).attr('id'),
      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough',
                       '|', 'formatOL', 'formatUL',
                       '|', 'insertTable', 'insertHR', 'clearFormatting'],
      htmlRemoveTags: ['script', 'style', 'object', 'audio', 'video'],
      iframe: false,
      heightMin: 100,
      language: locale
    });
  });
});
