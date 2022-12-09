// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
import * as readline from 'readline-sync';
import { User } from '@microsoft/microsoft-graph-types';

import settings, { AppSettings } from './appSettings';
import * as graphHelper from './graphHelper';

async function main() {
  console.log('TypeScript Graph Tutorial');

  let choice = 0;

  // Initialize Graph
  initializeGraph(settings);

  const choices = [
    'Display access token',
    'List users',
    'Make a Graph call'
  ];

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', { cancel: 'Exit' });

    switch (choice) {
      case -1:
        // Exit
        console.log('Goodbye...');
        break;
      case 0:
        // Display access token
        await displayAccessTokenAsync();
        break;
      case 1:
        // List users
        await listUsersAsync();
        break;
      case 2:
        // Run any Graph code
        await makeGraphCallAsync();
        break;
      default:
        console.log('Invalid choice! Please try again.');
    }
  }
}

main();
// </ProgramSnippet>

// <InitializeGraphSnippet>
function initializeGraph(settings: AppSettings) {
  graphHelper.initializeGraphForAppOnlyAuth(settings);
}
// </InitializeGraphSnippet>

// <DisplayAccessTokenSnippet>
async function displayAccessTokenAsync() {
  try {
    const userToken = await graphHelper.getAppOnlyTokenAsync();
    console.log(`App-only token: ${userToken}`);
  } catch (err) {
    console.log(`Error getting app-only access token: ${err}`);
  }
}
// </DisplayAccessTokenSnippet>

// <ListUsersSnippet>
async function listUsersAsync() {
  try {
    const userPage = await graphHelper.getUsersAsync();
    const users: User[] = userPage.value;

    // Output each user's details
    for (const user of users) {
      console.log(`User: ${user.displayName ?? 'NO NAME'}`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.mail ?? 'NO EMAIL'}`);
    }

    // If @odata.nextLink is not undefined, there are more users
    // available on the server
    const moreAvailable = userPage['@odata.nextLink'] != undefined;
    console.log(`\nMore users available? ${moreAvailable}`);
  } catch (err) {
    console.log(`Error getting users: ${err}`);
  }
}
// </ListUsersSnippet>

// <MakeGraphCallSnippet>
async function makeGraphCallAsync() {
  try {
    await graphHelper.makeGraphCallAsync();
  } catch (err) {
    console.log(`Error making Graph call: ${err}`);
  }
}
// </MakeGraphCallSnippet>
