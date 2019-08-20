// @flow
import type { Site } from '../../../../shared/types/schedule.types';

export default class SitesComponentTestData {
  static getTestSites(): Site[] {
    return [
      {
        id: '63627e90-f80c-4533-ba0c-e9d06c988f77',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '7abf25a1-645c-44ee-879c-dad5ab26e9fc',
        type: 'site',
        name: 'Abbott Construction',
      },
      {
        id: '0ee67982-bc22-4983-a800-5a152a957952',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '31ea3851-b3a5-4f70-aae0-f3367aa1f877',
        type: 'site',
        name: 'Anderson Bank & Trust',
      },
      {
        id: 'c64fe39b-f3f0-4adb-872c-3842a88c01c9',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '9d121bee-35d6-4db9-9230-d512b3d21f7e',
        type: 'site',
        name: 'Del Taco',
      },
      {
        id: '5627a063-c2fc-491b-8407-326751adc373',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '3d41afe7-7324-482f-9278-63213b5c7b3c',
        type: 'site',
        name: 'Friar Tucks Bar & Grill',
      },
      {
        id: '0f13f606-21d7-49a3-888c-98d179826309',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: 'e704edcb-744d-4eb0-9899-45531e1e798c',
        type: 'site',
        name: 'Grand Lake Theater',
      },
      {
        id: 'a002363b-fbe7-461a-ad1b-36d17296534f',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: 'fc7a0c8f-a8c7-4d85-bfb6-a227a7de8447',
        type: 'site',
        name: "Gus's Market",
      },
      {
        id: '0e6f4721-9cb5-4d9b-9a1d-a2dbbb8f0646',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '49b335eb-3092-4348-ba32-dd68f43e48e9',
        type: 'site',
        name: "Justin's Camera Supply",
      },
      {
        id: 'a67dd6ce-216c-486b-b4b3-7cc59230c857',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: '5b8b8f8d-5219-48c2-8c3b-53ee8e7b1974',
        type: 'site',
        name: 'Kilroy Spa',
      },
      {
        id: 'a604eef7-8f07-461e-b37b-674dc1a3fbab',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        customerId: 'a98f6420-8ebb-49f7-a504-3a3e1c874db3',
        type: 'site',
        name: 'Menards',
      },
    ];
  }
}
