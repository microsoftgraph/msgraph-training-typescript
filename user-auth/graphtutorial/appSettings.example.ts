// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <SettingsSnippet>
const settings: AppSettings = {
  'clientId': 'YOUR_CLIENT_ID_HERE',
  'tenantId': 'common',
  'graphUserScopes': [
    'user.read',
    'mail.read',
    'mail.send'
  ]
};

export interface AppSettings {
  clientId: string;
  tenantId: string;
  graphUserScopes: string[];
}

export default settings;
// </SettingsSnippet>
