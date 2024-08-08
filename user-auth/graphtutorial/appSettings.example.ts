// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// <SettingsSnippet>
const settings: AppSettings = {
  clientId: 'YOUR_CLIENT_ID_HERE',
  tenantId: 'common',
  graphUserScopes: ['user.read', 'mail.read', 'mail.send'],
};

export interface AppSettings {
  clientId: string;
  tenantId: string;
  graphUserScopes: string[];
}

export default settings;
// </SettingsSnippet>
