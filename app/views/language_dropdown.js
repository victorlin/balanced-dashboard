Balanced.LanguageDropdownView = Balanced.View.extend({
    templateName: 'language_dropdown',

    switch: function (lang_code) {
        Balanced.i18n.switch_language(lang_code);
    }
});
