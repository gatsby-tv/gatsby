"use strict";

exports.__esModule = true;
exports.useChannel = useChannel;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useChannel(unique) {
  const {
    data,
    error
  } = (0, _swr.default)(unique ? "/channel/" + unique : null);
  return {
    channel: data,
    loading: !error && !data,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLWNoYW5uZWwudHMiXSwibmFtZXMiOlsidXNlQ2hhbm5lbCIsInVuaXF1ZSIsImRhdGEiLCJlcnJvciIsImNoYW5uZWwiLCJsb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBS08sU0FBU0EsVUFBVCxDQUFvQkMsTUFBcEIsRUFBd0U7QUFDN0UsUUFBTTtBQUFFQyxJQUFBQSxJQUFGO0FBQVFDLElBQUFBO0FBQVIsTUFBa0Isa0JBQU9GLE1BQU0saUJBQWVBLE1BQWYsR0FBMEIsSUFBdkMsQ0FBeEI7QUFFQSxTQUFPO0FBQ0xHLElBQUFBLE9BQU8sRUFBRUYsSUFESjtBQUVMRyxJQUFBQSxPQUFPLEVBQUUsQ0FBQ0YsS0FBRCxJQUFVLENBQUNELElBRmY7QUFHTEMsSUFBQUE7QUFISyxHQUFQO0FBS0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlU1dSIGZyb20gXCJzd3JcIjtcbmltcG9ydCB7IENoYW5uZWwgfSBmcm9tIFwiQGdhdHNieS10di90eXBlc1wiO1xuXG5pbXBvcnQgeyBGZXRjaFJlc3BvbnNlIH0gZnJvbSBcIkBsaWIvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNoYW5uZWwodW5pcXVlPzogc3RyaW5nKTogRmV0Y2hSZXNwb25zZTxcImNoYW5uZWxcIiwgQ2hhbm5lbD4ge1xuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSB1c2VTV1IodW5pcXVlID8gYC9jaGFubmVsLyR7dW5pcXVlfWAgOiBudWxsKTtcblxuICByZXR1cm4ge1xuICAgIGNoYW5uZWw6IGRhdGEsXG4gICAgbG9hZGluZzogIWVycm9yICYmICFkYXRhLFxuICAgIGVycm9yLFxuICB9O1xufVxuIl19