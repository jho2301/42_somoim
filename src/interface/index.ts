import { WebAPICallResult } from '@slack/web-api';

export interface UsersInfoResult extends WebAPICallResult {
  user?: {
    profile: {
      email?: string;
    };
  };
}
