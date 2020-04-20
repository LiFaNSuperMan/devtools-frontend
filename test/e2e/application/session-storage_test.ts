// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';
import {describe, it} from 'mocha';

import {getBrowserAndPages} from '../../shared/helper.js';

import {doubleClickSourceTreeItem, getDataGridData, navigateToApplicationTab} from '../helpers/application-helpers.js';

const SESSION_STORAGE_SELECTOR = '[aria-label="Session Storage"]';
const DOMAIN_SELECTOR = `${SESSION_STORAGE_SELECTOR} + ol > [aria-label="http://localhost:8090"]`;

describe('The Application Tab', async () => {
  it('shows Session Storage keys and values', async () => {
    const {target} = getBrowserAndPages();
    await navigateToApplicationTab(target, 'session-storage');

    await doubleClickSourceTreeItem(SESSION_STORAGE_SELECTOR);
    await doubleClickSourceTreeItem(DOMAIN_SELECTOR);

    const dataGridRowValues = await getDataGridData('.storage-view table', ['key', 'value']);
    assert.deepEqual(dataGridRowValues, [
      {
        key: 'firstKey',
        value: 'firstValue',
      },
      {
        key: 'secondKey',
        value: '{"field":"complexValue","primitive":2}',
      },
      {
        key: '',
        value: '',
      },
    ]);
  });
});