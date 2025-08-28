import createHttpError from 'http-errors';

export const getCurrent = async (req, res, next) => {
  try {
    const user = req.body;

    if (!user) {
      return next(createHttpError(404, 'User not fond'));
    }

    res.status(200).json({
      status: 200,
      message: 'User info retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
