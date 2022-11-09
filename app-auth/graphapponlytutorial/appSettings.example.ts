// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const settings: AppSettings = {
  'clientId': 'YOUR_CLIENT_ID_HERE',
  'clientSecret': 'YOUR_CLIENT_SECRET_HERE',
  'tenantId': 'common'
};

export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export default settings;
