// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <UserAuthConfigSnippet>
import 'isomorphic-fetch';
import { ClientSecretCredential, DeviceCodeCredential, DeviceCodePromptCallback } from '@azure/identity';
import { Client, PageCollection } from '@microsoft/microsoft-graph-client';
import { User, Message } from '@microsoft/microsoft-graph-types';
import { TokenCredentialAuthenticationProvider } from
  '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';

import { AppSettings } from './appSettings';

let _settings: AppSettings | undefined = undefined;
let _deviceCodeCredential: DeviceCodeCredential | undefined = undefined;
let _userClient: Client | undefined = undefined;

export function initializeGraphForUserAuth(settings: AppSettings, deviceCodePrompt: DeviceCodePromptCallback) {
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  _deviceCodeCredential = new DeviceCodeCredential({
    clientId: settings.clientId,
    tenantId: settings.authTenant,
    userPromptCallback: deviceCodePrompt
  });

  const authProvider = new TokenCredentialAuthenticationProvider(_deviceCodeCredential, {
    scopes: settings.graphUserScopes
  });

  _userClient = Client.initWithMiddleware({
    authProvider: authProvider
  });
}
// </UserAuthConfigSnippet>

// <GetUserTokenSnippet>
export async function getUserTokenAsync(): Promise<string> {
  // Ensure credential isn't undefined
  if (!_deviceCodeCredential) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Ensure scopes isn't undefined
  if (!_settings?.graphUserScopes) {
    throw new Error('Setting "scopes" cannot be undefined');
  }

  // Request token with given scopes
  const response = await _deviceCodeCredential.getToken(_settings?.graphUserScopes);
  return response.token;
}
// </GetUserTokenSnippet>

// <GetUserSnippet>
export async function getUserAsync(): Promise<User> {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me')
    // Only request specific properties
    .select(['displayName', 'mail', 'userPrincipalName'])
    .get();
}
// </GetUserSnippet>

// <GetInboxSnippet>
export async function getInboxAsync(): Promise<PageCollection> {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me/mailFolders/inbox/messages')
    .select(['from', 'isRead', 'receivedDateTime', 'subject'])
    .top(25)
    .orderby('receivedDateTime DESC')
    .get();
}
// </GetInboxSnippet>

// <SendMailSnippet>
export async function sendMailAsync(subject: string, body: string, recipient: string) {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Create a new message
  const message: Message = {
    subject: subject,
    body: {
      content: body,
      contentType: 'text'
    },
    toRecipients: [
      {
        emailAddress: {
          address: recipient
        }
      }
    ]
  };

  // Send the message
  return _userClient.api('me/sendMail')
    .post({
      message: message
    });
}
// </SendMailSnippet>

// <AppOnyAuthConfigSnippet>
let _clientSecretCredential: ClientSecretCredential | undefined = undefined;
let _appClient: Client | undefined = undefined;

function ensureGraphForAppOnlyAuth() {
  // Ensure settings isn't null
  if (!_settings) {
    throw new Error('Settings cannot be undefined');
  }

  if (!_clientSecretCredential) {
    _clientSecretCredential = new ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret
    );
  }

  if (!_appClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(_clientSecretCredential, {
      scopes: [ 'https://graph.microsoft.com/.default' ]
    });

    _appClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
// </AppOnyAuthConfigSnippet>

// <GetUsersSnippet>
export async function getUsersAsync(): Promise<PageCollection> {
  ensureGraphForAppOnlyAuth();

  return _appClient?.api('/users')
    .select(['displayName', 'id', 'mail'])
    .top(25)
    .orderby('displayName')
    .get();
}
// </GetUsersSnippet>

// <MakeGraphCallSnippet>
// This function serves as a playground for testing Graph snippets
// or other code
export async function makeGraphCallAsync() {
  // INSERT YOUR CODE HERE
  // Note: if using _appClient, be sure to call ensureGraphForAppOnlyAuth
  // before using it.
  // ensureGraphForAppOnlyAuth();
}
// </MakeGraphCallSnippet>
