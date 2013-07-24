/*
 this file is generated as part of the build process.
 If you haven't run that yet, you won't see it.

 It is excluded from git commits since it's a
 generated file.
 */
require('build/js/compiled-templates');

/*
 * I18n stuff
 */
require('app/i18n/locales/_base');
require('app/i18n/locales/en_us');
require('app/i18n/locales/zh_tw');
require('app/i18n/init');

/*
 * Helpers and utils - not static 3rd party libraries
 */
require('app/lib/errors');
require('app/lib/variables');
require('app/lib/ajax');
require('app/lib/forms');
require('app/lib/helpers');
require('app/lib/handlebar_helpers');
require('app/lib/jquery-hotkeys');
require('app/lib/strftime');
require('app/lib/migration');
require('app/lib/analytics');

/*
 * Model layer.
 * Ember.Object itself provides most of what
 * model layers elsewhere provide.
 */
require('app/models/core/core');
require('app/models/api_key');
require('app/models/download');
require('app/models/user_marketplace');
require('app/models/marketplace');
require('app/models/user');
require('app/models/login');
require('app/models/forgot_password');
require('app/models/reset_password');
require('app/models/account');
require('app/models/transaction');
require('app/models/credit');
require('app/models/debit');
require('app/models/hold');
require('app/models/refund');
require('app/models/funding_instrument');
require('app/models/bank_account');
require('app/models/card');
require('app/models/search_query');
require('app/models/callback');
require('app/models/customer');
require('app/models/verification');
require('app/models/production_access_application');
require('app/models/initial_deposit');

require('app/lib/auth');

/*
 * Views layer.
 * Ember accomplishes a lot in its templates and
 * Views are only necessary if you have view-specific
 * programming to do.
 */
require('app/views/_base');
require('app/views/alert_view');
require('app/views/base_form');
require('app/views/control_group');
require('app/views/date_picker');
require('app/views/modal');
require('app/views/modal_action_buttons');
require('app/views/embedded_iframe');
require('app/views/login');
require('app/views/forgot_password'); // depends on login
require('app/views/reset_password'); // depends on login
require('app/views/results');
require('app/views/search');
require('app/views/welcome_transition');
require('app/views/language_dropdown');

require('app/views/marketplace/marketplace');
require('app/views/marketplace/marketplace_settings');
require('app/views/customer');
require('app/views/marketplace/add_bank_account_modal');
require('app/views/marketplace/add_callback_modal');
require('app/views/marketplace/add_card_modal');
require('app/views/marketplace/add_funds_modal');
require('app/views/marketplace/delete_bank_account_modal');
require('app/views/marketplace/delete_callback_modal');
require('app/views/marketplace/delete_card_modal');
require('app/views/marketplace/edit_marketplace_info_modal');
require('app/views/marketplace/edit_owner_info_modal');
require('app/views/marketplace/verify_bank_account_modal');
require('app/views/marketplace/withdraw_funds_modal');
require('app/views/marketplaces/add_existing_marketplace');
require('app/views/marketplaces/add_test_marketplace');
require('app/views/marketplaces/delete_marketplace_modal');
require('app/views/pay_seller');
require('app/views/customer/debit_customer_modal');
require('app/views/customer/credit_customer_modal');
require('app/views/customer/edit_customer_info_modal');
require('app/views/funding_instrument/debit_funding_instrument_modal');
require('app/views/funding_instrument/credit_bank_account_modal');

/*
 * Controller layer.
 * Controllers wrap objects and provide a place
 * to implement properties for display
 * whose value is computed from the content of the
 * controllers wrapped objects.
 */
require('app/controllers/_base');
require('app/controllers/mixins/downloads');
require('app/controllers/mixins/results_table');
require('app/controllers/mixins/transactions_table');
require('app/controllers/activity');
require('app/controllers/application');
require('app/controllers/claim');
require('app/controllers/marketplaces');
require('app/controllers/marketplace');
require('app/controllers/marketplace_settings');
require('app/controllers/login');
require('app/controllers/forgot_password');
require('app/controllers/reset_password');
require('app/controllers/search');

require('app/controllers/marketplaces/apply');
require('app/controllers/marketplaces/index');
require('app/controllers/marketplaces/initial_deposit');
require('app/controllers/accounts');
require('app/controllers/logs');
require('app/controllers/invoices');
require('app/controllers/cards');
require('app/controllers/bank_accounts');
require('app/controllers/customers');

/*
 * States (i.e. Routes)
 * Handles serialization of the application's current state
 * which results in view hierarchy updates. Responds to
 * actions.
 */
require('app/routes/router');
