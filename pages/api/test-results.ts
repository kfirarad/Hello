import { NextApiRequest } from 'next';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { TestResult } from 'types';

import { craeteTestResult } from '../../helpers/testResult';

const db = new JsonDB(new Config("db", true, false, '/'));

const createTestResultFromRequest = function (requestBody): TestResult {
  const parsedBody = JSON.parse(requestBody);
  const { testName = '', testResult = undefined } = parsedBody;
  const newTestResult = craeteTestResult(testName, parseFloat(testResult));
  return newTestResult;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const results = db.getData('/testResults');
        const responseBody = {
          ok: true,
          data: results
        }
        res.status(200).json(responseBody);
      } catch (e) {
        res.status(404).json({
          ok: false,
          data: [],
          error: 'No test results found'
        });
      }
      break;

    case 'POST':
      try {
        const newTestResult = createTestResultFromRequest(req.body);
        db.push('/testResults[]', newTestResult);
        const newResults = db.getData('/testResults');
        const responseBody = {
          ok: true,
          data: newResults
        }
        res.status(200).json(responseBody);
      } catch (e) {
        res.status(422).json({
          ok: false,
          error: e.message,
          data: [],
        });
      }
  }
}

