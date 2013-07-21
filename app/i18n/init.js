/*
 * The empty translations
 */
Ember.I18n.translations = {};

/*
 * This line makes all <key>Translation attribute in views will be replaced
 * with the translation message, for example
 * placeholderTranslation="login.password" will yield "Password"
 */
Ember.TextField.reopen.call(Ember.TextField, Ember.I18n.TranslateableAttributes);


/*
 * The i18n namespace
 */
Balanced.i18n = Balanced.i18n || {};

/*
 * The default language to use
 */
Balanced.i18n.default_lang = 'en_us';

/*
 * Supported languages
 */
Balanced.i18n.supported_languages = [
    {'current': false, 'code': 'en_us', 'name': 'English'}, 
    {'current': false, 'code': 'zh_tw', 'name': '繁體中文'}
];


/*
 * Set current UI language, for example
 * Calling set_language('zh_tw') sets the language to Tradtional Chinese
 */
var set_language = function (lang_code) {
    var default_locale = Balanced.locales[Balanced.i18n.default_lang];
    var locale = Balanced.locales[lang_code];
    /* The language does not exist, fallback to the default one */
    if (locale === undefined) {
        locale = default_locale;
    }
    /* When a message is missing in the target locale,
     * we fallback to the default locale
     */
    for(var key in default_locale) {
        if (locale[key] === undefined) {
            locale[key] = default_locale[key];
        }
    }
    Ember.I18n.translations = locale;
};

/*
 * Normalize language code from zh-TW form into zh_tw form
 */
var normalize_language_code = function(lang_code) {
    lang_code = lang_code.replace('-', '_');
    lang_code = lang_code.toLowerCase();
    return lang_code;
};

/*
 * Get current language code for user
 * 1. We check `locale` key in cookie, use it if we found it
 * 2. If there is no `locale` in cookie, get language code from navigator.language
 *
 * TODO: maybe we should use a better way to determine language ? 
 * TODO: how about Accept-Language in the HTTP header?
 *
 *  Some reference:
 *  http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
 */
var get_current_lang_code = function() {
    var lang_code = $.cookie('locale');
    if (lang_code === undefined) {
        lang_code = navigator.language;
    }
    lang_code = normalize_language_code(lang_code);
    if (! (lang_code in Balanced.locales) ) {
        lang_code = Balanced.i18n.default_lang;
    }
    return lang_code;
};

/*
 * Switch UI language and realod the page
 */
Balanced.i18n.switch_language = function(lang_code) {
    $.cookie('locale', lang_code);
    /* TODO: maybe we can find a better way to reload the new locale without refresh page */
    window.location.reload();
};

/*
 * Get current supported language information
 */
var get_current_language_info = function() {
    var lang_code = get_current_lang_code();
    var found = null;
    var i;
    for (i = 0; i < Balanced.i18n.supported_languages.length; ++i) {
        var lang_info = Balanced.i18n.supported_languages[i];
        if (lang_info.code === lang_code) {
            found = lang_info;
        }
    }
    return found;
};

var lang_code = get_current_lang_code();
set_language(lang_code);
Balanced.i18n.current_language_info = get_current_language_info();