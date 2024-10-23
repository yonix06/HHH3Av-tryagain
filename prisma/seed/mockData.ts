import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('24a49d8c-282a-427d-b806-8b9dd4b42fc5', '1Linnie_Lebsack38@gmail.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv123abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('5bee7259-8c28-41cf-8fe0-19c3f2a0d3b1', '10Ronaldo83@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=12', 'inv123abc', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('f71fcda4-9d3b-4cc3-ad8d-466d55957d5d', '19Mya_Ferry@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=21', 'inv012jkl', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('fdb29ace-30ac-462e-895e-277c926f1c69', '28Susie22@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=30', 'inv012jkl', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ab0083c2-8d15-4c3a-b209-6100d15b1335', '37Salvatore.Rath2@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=39', 'inv789ghi', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('7b9a54d1-6b13-44ff-9718-e8d62f834ccb', '46Felton87@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=48', 'inv789ghi', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('b303db96-6bbd-4f50-9883-197505e42625', '55Jaquelin.Altenwerth18@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=57', 'inv012jkl', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e84bbbcd-18e6-479a-b502-b0d795eae1e3', '64Ora_Murray@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=66', 'inv456def', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576', '73Osvaldo_Schmidt19@yahoo.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv789ghi', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2818c9a7-ff18-4cea-afe0-0de604b5bccf', 'City Infrastructure Committee', 'https://i.imgur.com/YfJQV5z.png?id=92');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('80fe8e56-ab09-4346-b0e1-92f031cdc30c', 'Urban Development Council', 'https://i.imgur.com/YfJQV5z.png?id=95');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('16d87c81-44dd-4248-8b2a-81c83a4bfbe5', 'Local Governance Board', 'https://i.imgur.com/YfJQV5z.png?id=98');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('0bc218c2-1254-4d6f-a0ba-c61099d2d308', 'Local Governance Board', 'https://i.imgur.com/YfJQV5z.png?id=101');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('034ef4bf-70f2-4cf8-9ef2-cee98ba30e90', 'City Infrastructure Committee', 'https://i.imgur.com/YfJQV5z.png?id=104');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('000d7be3-dd3c-457c-9c91-bd1f2ea0f472', 'City Infrastructure Committee', 'https://i.imgur.com/YfJQV5z.png?id=107');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1c2cfea6-061b-45a3-8301-976a81c35141', 'Greenfield Municipal Services', 'https://i.imgur.com/YfJQV5z.png?id=110');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd', 'Greenfield Municipal Services', 'https://i.imgur.com/YfJQV5z.png?id=113');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4d5af283-6d70-4638-a2b1-744bcac1f4d7', 'City Infrastructure Committee', 'https://i.imgur.com/YfJQV5z.png?id=116');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('d76f82c5-545d-47e7-a296-a8660bbaf6da', 'Greenfield Municipal Services', 'https://i.imgur.com/YfJQV5z.png?id=119');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e4a8f22c-f20a-4e08-86bd-2e16a635957b', 'Community Liaison', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '4d5af283-6d70-4638-a2b1-744bcac1f4d7');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('8cfd8035-baea-4de0-9996-2e0a6333dada', 'Public Relations Officer', '2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576', '0bc218c2-1254-4d6f-a0ba-c61099d2d308');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('3c5346be-1305-4e37-a731-e1374c1e3501', 'Event Coordinator', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('3c2afcf0-1f11-49d0-a6b1-afaead18eacc', 'Community Liaison', 'e84bbbcd-18e6-479a-b502-b0d795eae1e3', '4d5af283-6d70-4638-a2b1-744bcac1f4d7');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('b32acc7a-458b-43c0-8f77-338c02d8b9b1', 'City Planner', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('25f6ca0d-47f6-411c-8b18-66bd79817a8b', 'Infrastructure Manager', 'e84bbbcd-18e6-479a-b502-b0d795eae1e3', '000d7be3-dd3c-457c-9c91-bd1f2ea0f472');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('90c92990-58b9-4bf6-aab0-a89be74b8b92', 'City Planner', 'f71fcda4-9d3b-4cc3-ad8d-466d55957d5d', '034ef4bf-70f2-4cf8-9ef2-cee98ba30e90');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('216dee06-02b7-4783-bc67-0e820010337c', 'Infrastructure Manager', '2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576', '034ef4bf-70f2-4cf8-9ef2-cee98ba30e90');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('b4c344dc-4788-4044-beb9-3b6f55c12700', 'Infrastructure Manager', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb', '000d7be3-dd3c-457c-9c91-bd1f2ea0f472');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('693ed8ac-a5b6-493b-abd1-2babf38648b5', 'Community Liaison', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '4d5af283-6d70-4638-a2b1-744bcac1f4d7');

INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('5a5352f3-5190-415a-9e80-3fe1916f18e0', 'httpsexample.comendpoint2', 'subscriptionData4', 'fdb29ace-30ac-462e-895e-277c926f1c69');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('22addf4d-3cca-40fa-8148-9779753ce87e', 'httpsexample.comendpoint3', 'subscriptionData4', 'b303db96-6bbd-4f50-9883-197505e42625');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('2a3074ed-e8b9-4662-9513-91dd0e0ce0ec', 'httpsexample.comendpoint3', 'subscriptionData3', 'fdb29ace-30ac-462e-895e-277c926f1c69');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('e14235d8-386a-4c0a-99a5-27c966082f57', 'httpsexample.comendpoint1', 'subscriptionData1', 'f71fcda4-9d3b-4cc3-ad8d-466d55957d5d');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('06ba2b9e-91e4-4f65-ab24-50da4dafa549', 'httpsexample.comendpoint1', 'subscriptionData4', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('22e23697-2162-4c0a-adb8-4e0c63b99109', 'httpsexample.comendpoint5', 'subscriptionData2', 'fdb29ace-30ac-462e-895e-277c926f1c69');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('6ab376f1-2d45-4643-8bdb-d1b3f4563930', 'httpsexample.comendpoint2', 'subscriptionData3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('1e7ab73f-79c6-421b-9d1b-042dc2df774a', 'httpsexample.comendpoint4', 'subscriptionData4', '2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('0cad9d73-926b-42e6-a715-7a04e3311241', 'httpsexample.comendpoint5', 'subscriptionData2', 'f71fcda4-9d3b-4cc3-ad8d-466d55957d5d');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('b7d598bc-2097-471f-8728-3cb2f645aa9b', 'httpsexample.comendpoint5', 'subscriptionData4', 'f71fcda4-9d3b-4cc3-ad8d-466d55957d5d');

INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('f978152f-34c5-4fcf-b8a2-9e59b276fd67', 'EnvironmentalPolicy', '0bc218c2-1254-4d6f-a0ba-c61099d2d308');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('3565bf87-2a01-4450-9fc4-dbff03adfead', 'EnvironmentalPolicy', '1c2cfea6-061b-45a3-8301-976a81c35141');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('fa803212-4f97-4f45-acdd-81e368c4c9e0', 'EnvironmentalPolicy', 'd76f82c5-545d-47e7-a296-a8660bbaf6da');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('21710114-41a8-4ba2-ab8a-b2990dd5f0b0', 'PublicSafety', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('a7a899c6-4dc6-4761-bd97-ff58c7042925', 'PublicSafety', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('b0418734-46f0-4636-9901-83cebbfd35ed', 'PublicSafety', '0bc218c2-1254-4d6f-a0ba-c61099d2d308');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('191a735f-3bb9-4d7c-b41a-9753fde1def7', 'EnvironmentalPolicy', '1c2cfea6-061b-45a3-8301-976a81c35141');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('fb070058-2e29-41d8-8929-aed068d62fca', 'EnvironmentalPolicy', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('577543c6-9687-403c-99ad-f09323f9cc1d', 'PublicSafety', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "Tag" ("id", "name", "organizationId") VALUES ('1b4c97e1-eb70-4641-a481-7cfe9ee04771', 'TrafficUpdate', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');

INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('53bc27ac-5fe0-4040-99f5-189ef7f9eede', 'Community Meetings', 'Information on upcoming community meetings', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('b8f88e54-2988-413c-8fc1-5953ddbadda3', 'Community Meetings', 'Notifications about upcoming local events', 'd76f82c5-545d-47e7-a296-a8660bbaf6da');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('5b066ad0-f537-4fa2-a988-45326061997d', 'City Council Updates', 'Alerts for scheduled roadwork in the area', '034ef4bf-70f2-4cf8-9ef2-cee98ba30e90');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('19cab175-47ad-4846-a536-4ad553fa31d0', 'Roadwork Alerts', 'Notifications about upcoming local events', '4d5af283-6d70-4638-a2b1-744bcac1f4d7');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('365c1a5d-8817-45e8-9ae6-f654cf9f8c4c', 'Local Events Notifications', 'Monthly updates on city council decisions', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('c4519a39-e326-4b42-bb69-43699f79081e', 'Local Events Notifications', 'Notifications about upcoming local events', '1c2cfea6-061b-45a3-8301-976a81c35141');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('15d79dfa-e75d-4321-8e38-725e7323f8de', 'Roadwork Alerts', 'Alerts for scheduled roadwork in the area', '16d87c81-44dd-4248-8b2a-81c83a4bfbe5');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('a70591e7-2161-4db9-b1b2-076a667a560b', 'Roadwork Alerts', 'Information on upcoming community meetings', '1c2cfea6-061b-45a3-8301-976a81c35141');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('c5bfbec2-8645-4206-a4c3-66cfcf0697a6', 'City Council Updates', 'Information on upcoming community meetings', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "EmailList" ("id", "name", "description", "organizationId") VALUES ('b718bb80-50dc-4bd9-b80e-8a5ccabeb101', 'Local Events Notifications', 'Updates on parking regulations and changes', '000d7be3-dd3c-457c-9c91-bd1f2ea0f472');

INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('d5aecde9-4b60-424c-8eec-fc2d0b28b024', 'Community Newsletter', 'Notification of upcoming road closures.', 'https://i.imgur.com/YfJQV5z.png?id=223', '000d7be3-dd3c-457c-9c91-bd1f2ea0f472');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('50d91f5d-f270-41e8-adbe-a42585d7bd41', 'Local Event Permit', 'Agenda for the upcoming city council meeting.', 'https://i.imgur.com/YfJQV5z.png?id=227', '1c2cfea6-061b-45a3-8301-976a81c35141');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('9c439ed3-b077-4f13-bc2e-c03ac8fbcf7a', 'Community Newsletter', 'Permit application for hosting local events.', 'https://i.imgur.com/YfJQV5z.png?id=231', 'd76f82c5-545d-47e7-a296-a8660bbaf6da');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('d44b2e8c-1677-4f40-8aa9-a966b8490751', 'Local Event Permit', 'Update on new parking regulations.', 'https://i.imgur.com/YfJQV5z.png?id=235', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('303feadf-2e16-461a-87b1-e67aa033c002', 'City Council Meeting Agenda', 'Agenda for the upcoming city council meeting.', 'https://i.imgur.com/YfJQV5z.png?id=239', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('55dd9691-2712-438c-90d7-16424ce26dcf', 'Road Closure Notice', 'Agenda for the upcoming city council meeting.', 'https://i.imgur.com/YfJQV5z.png?id=243', '16d87c81-44dd-4248-8b2a-81c83a4bfbe5');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('34e14290-b8c4-4433-8c55-d38550a35345', 'Local Event Permit', 'Permit application for hosting local events.', 'https://i.imgur.com/YfJQV5z.png?id=247', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('4a59708f-ac79-4ceb-9056-62315f9ced13', 'Community Newsletter', 'Update on new parking regulations.', 'https://i.imgur.com/YfJQV5z.png?id=251', 'd76f82c5-545d-47e7-a296-a8660bbaf6da');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('93bb62eb-cf9b-47b0-b511-6bef870f09cd', 'Local Event Permit', 'Agenda for the upcoming city council meeting.', 'https://i.imgur.com/YfJQV5z.png?id=255', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');
INSERT INTO "DocumentTemplate" ("id", "name", "description", "contentUrl", "organizationId") VALUES ('7217636c-71be-42d9-b048-e2707342d334', 'Parking Regulation Update', 'Notification of upcoming road closures.', 'https://i.imgur.com/YfJQV5z.png?id=259', '0bc218c2-1254-4d6f-a0ba-c61099d2d308');

INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('af510696-22bb-46b8-bbb0-fd7db45b22be', 'Parking Regulation Changes', 'Details about upcoming road construction projects in the city.', '5bee7259-8c28-41cf-8fe0-19c3f2a0d3b1', '80fe8e56-ab09-4346-b0e1-92f031cdc30c');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('0965680d-7bab-401b-8693-d80bb67784c6', 'Environmental Policy Decision', 'Minutes from the latest city council meeting discussing various local issues.', 'b303db96-6bbd-4f50-9883-197505e42625', '0bc218c2-1254-4d6f-a0ba-c61099d2d308');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('1fda714d-27df-40c3-9f23-d15ffdb26c52', 'Parking Regulation Changes', 'Minutes from the latest city council meeting discussing various local issues.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('8eaf2e82-07ee-4c60-8e28-a2b5921692f8', 'City Council Meeting Minutes', 'New policy decisions regarding environmental sustainability initiatives.', '5bee7259-8c28-41cf-8fe0-19c3f2a0d3b1', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('f0a4c5ef-effb-4163-9761-d3bec6c11f32', 'Parking Regulation Changes', 'New policy decisions regarding environmental sustainability initiatives.', 'ab0083c2-8d15-4c3a-b209-6100d15b1335', 'd76f82c5-545d-47e7-a296-a8660bbaf6da');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('3d409a6f-808d-4589-8b50-e358b2a2e362', 'Community Event Announcement', 'Information on recent changes to parking regulations in the downtown area.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('84ae7b7a-3a6c-43e2-aa38-14adeff5a7a4', 'Parking Regulation Changes', 'Details about upcoming road construction projects in the city.', 'e84bbbcd-18e6-479a-b502-b0d795eae1e3', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('63915738-439d-40b7-b2bb-e00923925899', 'Environmental Policy Decision', 'Minutes from the latest city council meeting discussing various local issues.', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '2818c9a7-ff18-4cea-afe0-0de604b5bccf');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('25b0a047-58c8-4314-8573-48621b88a426', 'Environmental Policy Decision', 'New policy decisions regarding environmental sustainability initiatives.', 'fdb29ace-30ac-462e-895e-277c926f1c69', '6a7b22c4-59bc-4f4c-a93d-d16bd888c6bd');
INSERT INTO "Document" ("id", "name", "description", "userId", "organizationId") VALUES ('def60a1e-83f6-4fe9-a98f-948b5f98380a', 'Local Road Construction Update', 'Information on recent changes to parking regulations in the downtown area.', 'b303db96-6bbd-4f50-9883-197505e42625', '000d7be3-dd3c-457c-9c91-bd1f2ea0f472');

INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('f2665615-68ae-4283-b9bf-f1945affacba', 556, 'https://i.imgur.com/YfJQV5z.png?id=292', '8eaf2e82-07ee-4c60-8e28-a2b5921692f8');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('6d4134b7-77c9-4c81-b5db-31d59ffbaac1', 229, 'https://i.imgur.com/YfJQV5z.png?id=295', '3d409a6f-808d-4589-8b50-e358b2a2e362');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('efa79fc7-339a-4b7e-87a1-bf1b7193ed85', 292, 'https://i.imgur.com/YfJQV5z.png?id=298', '1fda714d-27df-40c3-9f23-d15ffdb26c52');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('bb1f42d0-720e-42ae-97c3-fe255a244bea', 637, 'https://i.imgur.com/YfJQV5z.png?id=301', 'f0a4c5ef-effb-4163-9761-d3bec6c11f32');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('0a6f3aa5-fefb-48c8-9d9e-d5929f643547', 507, 'https://i.imgur.com/YfJQV5z.png?id=304', '3d409a6f-808d-4589-8b50-e358b2a2e362');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('fa46bd8c-0375-47ff-b4f3-af207c3c1f73', 657, 'https://i.imgur.com/YfJQV5z.png?id=307', '0965680d-7bab-401b-8693-d80bb67784c6');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('531bb35d-c58f-4e30-b279-cc9bdfba7af1', 53, 'https://i.imgur.com/YfJQV5z.png?id=310', 'af510696-22bb-46b8-bbb0-fd7db45b22be');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('039d319a-b4c5-4ed8-96bc-5ea9fe4f4c11', 94, 'https://i.imgur.com/YfJQV5z.png?id=313', 'def60a1e-83f6-4fe9-a98f-948b5f98380a');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('725a0e69-e2bd-4ea3-aa82-43dec206a780', 469, 'https://i.imgur.com/YfJQV5z.png?id=316', '1fda714d-27df-40c3-9f23-d15ffdb26c52');
INSERT INTO "DocumentVersion" ("id", "versionNumber", "contentUrl", "documentId") VALUES ('f201363d-a041-43f3-98fb-439efddaa477', 527, 'https://i.imgur.com/YfJQV5z.png?id=319', 'def60a1e-83f6-4fe9-a98f-948b5f98380a');

INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('80d999f5-5e3f-467b-bda0-456c6fdc6a0d', 'Completed', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '25b0a047-58c8-4314-8573-48621b88a426');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('02bbcc6a-cfee-4119-8b5a-37b85b45044a', 'Completed', 'b303db96-6bbd-4f50-9883-197505e42625', 'def60a1e-83f6-4fe9-a98f-948b5f98380a');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('84aee416-1495-46c6-b818-bd3743f7c1c3', 'Pending', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb', 'def60a1e-83f6-4fe9-a98f-948b5f98380a');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('3ea266e6-18bc-4d44-b9ad-51696ace00a2', 'Completed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0965680d-7bab-401b-8693-d80bb67784c6');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('a6a70c44-9100-4cab-8fab-591366be7e82', 'In Review', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '0965680d-7bab-401b-8693-d80bb67784c6');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('d5622717-1e0d-4bba-9737-91ecef28e676', 'Pending', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb', '3d409a6f-808d-4589-8b50-e358b2a2e362');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('9b39a983-211f-4ba7-b53a-b8caf023c8c0', 'Pending', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb', '1fda714d-27df-40c3-9f23-d15ffdb26c52');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('d02d0ecb-509c-46d2-b4f9-e8c3a5115702', 'Completed', 'ab0083c2-8d15-4c3a-b209-6100d15b1335', '1fda714d-27df-40c3-9f23-d15ffdb26c52');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('e646aaf0-7f67-42cf-8fdf-e42517ea07b4', 'Rejected', 'fdb29ace-30ac-462e-895e-277c926f1c69', '84ae7b7a-3a6c-43e2-aa38-14adeff5a7a4');
INSERT INTO "DocumentRequest" ("id", "status", "userId", "documentId") VALUES ('8368e9b4-740c-4ef5-aaca-083714d2f298', 'Completed', '2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576', '0965680d-7bab-401b-8693-d80bb67784c6');

INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('0327f21f-ffdb-43fd-82dc-e5e3e15fd142', 'In Review', 'Completed and archived successfully.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0a6f3aa5-fefb-48c8-9d9e-d5929f643547');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('4d66e1a8-78e8-437d-a36c-b57e49c0407b', 'Approved', 'Currently under review by the legal team.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'bb1f42d0-720e-42ae-97c3-fe255a244bea');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('90e72347-5df8-44e3-a133-7e3cd155d03f', 'Pending', 'Currently under review by the legal team.', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', '531bb35d-c58f-4e30-b279-cc9bdfba7af1');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('15e38c2c-4d85-450e-88b0-31f1c3533c17', 'In Review', 'Rejected due to insufficient information.', 'e84bbbcd-18e6-479a-b502-b0d795eae1e3', 'fa46bd8c-0375-47ff-b4f3-af207c3c1f73');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('fdbceaf0-d606-4c4c-8a74-4ebceb216b98', 'Pending', 'Approved by the city council.', '2a59cbe5-2cdb-4c1b-ae12-d4c3d70f7576', 'bb1f42d0-720e-42ae-97c3-fe255a244bea');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('316d1ff4-1f8d-4000-84cb-a5a57c7bfaa4', 'Completed', 'Completed and archived successfully.', 'fdb29ace-30ac-462e-895e-277c926f1c69', '6d4134b7-77c9-4c81-b5db-31d59ffbaac1');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('d344e5ed-5e11-42a8-a9ee-2806e3771e04', 'Pending', 'Approved by the city council.', 'b303db96-6bbd-4f50-9883-197505e42625', '039d319a-b4c5-4ed8-96bc-5ea9fe4f4c11');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('5da06f3f-55e6-49f2-816e-c4c14d5f67d9', 'In Review', 'Approved by the city council.', '24a49d8c-282a-427d-b806-8b9dd4b42fc5', 'f2665615-68ae-4283-b9bf-f1945affacba');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('542c9503-d4ca-46bc-b635-24e0fdfa3602', 'Approved', 'Approved by the city council.', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb', 'f2665615-68ae-4283-b9bf-f1945affacba');
INSERT INTO "Validation" ("id", "status", "comment", "userId", "documentVersionId") VALUES ('5577f5a9-e381-4d97-93e5-a2b3d684d38c', 'In Review', 'Awaiting further details from the requester.', 'b303db96-6bbd-4f50-9883-197505e42625', '0a6f3aa5-fefb-48c8-9d9e-d5929f643547');

INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('594a9bfa-e199-40d8-9362-5805a86a63db', 'af510696-22bb-46b8-bbb0-fd7db45b22be', 'fb070058-2e29-41d8-8929-aed068d62fca');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('e653e15b-a27d-4aed-8cb0-1ff2135ad5ea', '25b0a047-58c8-4314-8573-48621b88a426', '1b4c97e1-eb70-4641-a481-7cfe9ee04771');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('5ca0b872-13e4-4e65-afb6-c3706de62210', '3d409a6f-808d-4589-8b50-e358b2a2e362', 'a7a899c6-4dc6-4761-bd97-ff58c7042925');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('354f95fe-a544-4ec8-9840-e7040c99d7d8', '8eaf2e82-07ee-4c60-8e28-a2b5921692f8', 'f978152f-34c5-4fcf-b8a2-9e59b276fd67');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('cab95e10-9ddb-4c62-936c-c3154a584658', 'def60a1e-83f6-4fe9-a98f-948b5f98380a', 'f978152f-34c5-4fcf-b8a2-9e59b276fd67');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('996228d9-6d9b-48b2-a043-82302b80c8f6', '84ae7b7a-3a6c-43e2-aa38-14adeff5a7a4', 'fa803212-4f97-4f45-acdd-81e368c4c9e0');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('b12f8b13-feaf-477a-b09f-327333bb1dca', '84ae7b7a-3a6c-43e2-aa38-14adeff5a7a4', '21710114-41a8-4ba2-ab8a-b2990dd5f0b0');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('ad83be2f-4141-464c-9efd-6102370c6d6d', '8eaf2e82-07ee-4c60-8e28-a2b5921692f8', 'fb070058-2e29-41d8-8929-aed068d62fca');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('02bca7a8-27be-4a37-a9eb-a03b702a32a5', '84ae7b7a-3a6c-43e2-aa38-14adeff5a7a4', '21710114-41a8-4ba2-ab8a-b2990dd5f0b0');
INSERT INTO "DocumentTag" ("id", "documentId", "tagId") VALUES ('c5835908-01bb-46d2-b386-601dfa00f3e5', '3d409a6f-808d-4589-8b50-e358b2a2e362', '191a735f-3bb9-4d7c-b41a-9753fde1def7');

INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('d77d6b23-af97-470a-9d2d-4f65ebe7f155', 'c4519a39-e326-4b42-bb69-43699f79081e', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('9f5a726b-15be-46d3-a5e7-4154892c0772', 'b718bb80-50dc-4bd9-b80e-8a5ccabeb101', 'ab0083c2-8d15-4c3a-b209-6100d15b1335');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('18d66472-ee44-4dea-808e-3d647e03a9d9', 'b718bb80-50dc-4bd9-b80e-8a5ccabeb101', '5bee7259-8c28-41cf-8fe0-19c3f2a0d3b1');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('a20cdb08-2650-4dcb-bd90-78bb9236452e', '365c1a5d-8817-45e8-9ae6-f654cf9f8c4c', 'f71fcda4-9d3b-4cc3-ad8d-466d55957d5d');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('8668826d-7dd1-4c5b-9e3c-18840fa02657', '15d79dfa-e75d-4321-8e38-725e7323f8de', 'e84bbbcd-18e6-479a-b502-b0d795eae1e3');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('947fbbb9-a4f3-4b25-a257-fe2a52c037de', '53bc27ac-5fe0-4040-99f5-189ef7f9eede', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('5d2bfb6f-0db0-4169-8fdf-4146c4b5eeac', '53bc27ac-5fe0-4040-99f5-189ef7f9eede', 'fdb29ace-30ac-462e-895e-277c926f1c69');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('ed589ff7-4c32-4ba8-b65b-525d31f30d34', 'b8f88e54-2988-413c-8fc1-5953ddbadda3', 'fdb29ace-30ac-462e-895e-277c926f1c69');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('b9118f44-6f6f-437d-8584-7750e5aa45cd', 'c4519a39-e326-4b42-bb69-43699f79081e', 'b303db96-6bbd-4f50-9883-197505e42625');
INSERT INTO "EmailListUser" ("id", "emailListId", "userId") VALUES ('59609e81-c28a-40fe-87e3-45cbe01e7fac', '15d79dfa-e75d-4321-8e38-725e7323f8de', '7b9a54d1-6b13-44ff-9718-e8d62f834ccb');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
