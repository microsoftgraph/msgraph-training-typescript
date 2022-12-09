// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <SettingsSnippet>
const settings: AppSettings = {
  'clientId': 'YOUR_CLIENT_ID_HERE',
  'clientSecret': 'YOUR_CLIENT_SECRET_HERE',
  'tenantId': 'YOUR_TENANT_ID_HERE'
};

export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export default settings;
// </SettingsSnippet>
