"use strict";

exports.__esModule = true;
exports.useVideo = useVideo;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useVideo(id) {
  const {
    data,
    error
  } = (0, _swr.default)(id ? "/video/" + id : null);
  return {
    video: data,
    loading: !error && !data,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXZpZGVvLnRzIl0sIm5hbWVzIjpbInVzZVZpZGVvIiwiaWQiLCJkYXRhIiwiZXJyb3IiLCJ2aWRlbyIsImxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFLTyxTQUFTQSxRQUFULENBQWtCQyxFQUFsQixFQUE4RDtBQUNuRSxRQUFNO0FBQUVDLElBQUFBLElBQUY7QUFBUUMsSUFBQUE7QUFBUixNQUFrQixrQkFBT0YsRUFBRSxlQUFhQSxFQUFiLEdBQW9CLElBQTdCLENBQXhCO0FBRUEsU0FBTztBQUNMRyxJQUFBQSxLQUFLLEVBQUVGLElBREY7QUFFTEcsSUFBQUEsT0FBTyxFQUFFLENBQUNGLEtBQUQsSUFBVSxDQUFDRCxJQUZmO0FBR0xDLElBQUFBO0FBSEssR0FBUDtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZVNXUiBmcm9tIFwic3dyXCI7XG5pbXBvcnQgeyBWaWRlbyB9IGZyb20gXCJAZ2F0c2J5LXR2L3R5cGVzXCI7XG5cbmltcG9ydCB7IEZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVmlkZW8oaWQ/OiBzdHJpbmcpOiBGZXRjaFJlc3BvbnNlPFwidmlkZW9cIiwgVmlkZW8+IHtcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gdXNlU1dSKGlkID8gYC92aWRlby8ke2lkfWAgOiBudWxsKTtcblxuICByZXR1cm4ge1xuICAgIHZpZGVvOiBkYXRhLFxuICAgIGxvYWRpbmc6ICFlcnJvciAmJiAhZGF0YSxcbiAgICBlcnJvcixcbiAgfTtcbn1cbiJdfQ==