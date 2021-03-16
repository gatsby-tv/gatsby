"use strict";

exports.__esModule = true;
exports.useChannelContent = useChannelContent;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useChannelContent(id) {
  const {
    data,
    error
  } = (0, _swr.default)(id ? "/channel/" + id + "/content" : null);
  return {
    content: data,
    loading: !error && !data,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLWNoYW5uZWwtY29udGVudC50cyJdLCJuYW1lcyI6WyJ1c2VDaGFubmVsQ29udGVudCIsImlkIiwiZGF0YSIsImVycm9yIiwiY29udGVudCIsImxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFLTyxTQUFTQSxpQkFBVCxDQUNMQyxFQURLLEVBRXFDO0FBQzFDLFFBQU07QUFBRUMsSUFBQUEsSUFBRjtBQUFRQyxJQUFBQTtBQUFSLE1BQWtCLGtCQUFPRixFQUFFLGlCQUFlQSxFQUFmLGdCQUE4QixJQUF2QyxDQUF4QjtBQUVBLFNBQU87QUFDTEcsSUFBQUEsT0FBTyxFQUFFRixJQURKO0FBRUxHLElBQUFBLE9BQU8sRUFBRSxDQUFDRixLQUFELElBQVUsQ0FBQ0QsSUFGZjtBQUdMQyxJQUFBQTtBQUhLLEdBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VTV1IgZnJvbSBcInN3clwiO1xuaW1wb3J0IHsgQ2hhbm5lbENvbnRlbnQgfSBmcm9tIFwiQGdhdHNieS10di90eXBlc1wiO1xuXG5pbXBvcnQgeyBGZXRjaFJlc3BvbnNlIH0gZnJvbSBcIkBsaWIvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNoYW5uZWxDb250ZW50KFxuICBpZD86IHN0cmluZ1xuKTogRmV0Y2hSZXNwb25zZTxcImNvbnRlbnRcIiwgQ2hhbm5lbENvbnRlbnQ+IHtcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gdXNlU1dSKGlkID8gYC9jaGFubmVsLyR7aWR9L2NvbnRlbnRgIDogbnVsbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250ZW50OiBkYXRhLFxuICAgIGxvYWRpbmc6ICFlcnJvciAmJiAhZGF0YSxcbiAgICBlcnJvcixcbiAgfTtcbn1cbiJdfQ==