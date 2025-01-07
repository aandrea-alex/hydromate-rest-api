import createHttpError from 'http-errors';
// import { parsePaginationParams } from '../utils/parsePaginationParams.js';
// import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';
import {
  parseCurrentDayParam,
  parseCurrentMonthParam,
} from '../utils/parseFilterDateParam.js';

import {
  getAllWaterLogs,
  createWaterLog,
  updateWaterLog,
  deleteWaterLog,
  getWaterLogsByDate,
} from '../services/water.js';

export const getAllWaterLogsCtrl = async (req, res) => {
  const userId = req.user._id;
  const waterLogs = await getAllWaterLogs(userId);
  res.send({
    status: 200,
    message: 'Successfully found user all water-logs!',
    data: waterLogs,
  });
};

export const getWaterLogsForDayCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const filter = parseCurrentDayParam({ date });
  const result = await getWaterLogsByDate(userId, filter);

  res.send({
    status: 200,
    message: 'Successfully found water-logs for the day!',
    data: result.data,
  });
};

export const getWaterLogsForMonthCtrl = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const filter = parseCurrentDayParam({ date });
  const result = await parseCurrentMonthParam(userId, filter);
  res.send({
    status: 200,
    message: 'Successfully found water-logs for the month!',
    data: result.data,
  });
};

export const createWaterLogCtrl = async (req, res) => {
  const userId = req.user._id;
  const payload = { ...req.body, userId };

  const waterLog = await createWaterLog(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a water-log!`,
    data: waterLog,
  });
};

export const patchWaterLogCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const payload = { ...req.body, userId };

  const result = await updateWaterLog(id, payload);

  if (!result) {
    throw createHttpError(404, 'Water-log not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a waterLog!`,
    data: result.waterLog,
  });
};

export const deleteWaterLogCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await deleteWaterLog(id, userId);
  if (!contact) {
    throw createHttpError(404, 'Water-log not found');
  }

  res.status(204).send();
};
