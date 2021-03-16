"use strict";

exports.__esModule = true;
exports.useTopicsFeed = useTopicsFeed;

var _useInfinite2 = require("./use-infinite");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useTopicsFeed() {
  const _useInfinite = (0, _useInfinite2.useInfinite)(index => "/listing/topics?page=" + index),
        {
    data
  } = _useInfinite,
        props = _objectWithoutPropertiesLoose(_useInfinite, ["data"]);

  return _extends({
    topics: data
  }, props);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXRvcGljcy1mZWVkLnRzIl0sIm5hbWVzIjpbInVzZVRvcGljc0ZlZWQiLCJpbmRleCIsImRhdGEiLCJwcm9wcyIsInRvcGljcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTs7Ozs7O0FBR08sU0FBU0EsYUFBVCxHQUdMO0FBQ0EsdUJBQTJCLCtCQUN4QkMsS0FBRCw4QkFBbUNBLEtBRFYsQ0FBM0I7QUFBQSxRQUFNO0FBQUVDLElBQUFBO0FBQUYsR0FBTjtBQUFBLFFBQWlCQyxLQUFqQjs7QUFJQTtBQUNFQyxJQUFBQSxNQUFNLEVBQUVGO0FBRFYsS0FFS0MsS0FGTDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9waWNCcm93c2FibGUgfSBmcm9tIFwiQGdhdHNieS10di90eXBlc1wiO1xuXG5pbXBvcnQgeyB1c2VJbmZpbml0ZSB9IGZyb20gXCJAbGliL3V0aWxpdGllcy91c2UtaW5maW5pdGVcIjtcbmltcG9ydCB7IEluZmluaXRlRmV0Y2hSZXNwb25zZSB9IGZyb20gXCJAbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUb3BpY3NGZWVkKCk6IEluZmluaXRlRmV0Y2hSZXNwb25zZTxcbiAgXCJ0b3BpY3NcIixcbiAgVG9waWNCcm93c2FibGVcbj4ge1xuICBjb25zdCB7IGRhdGEsIC4uLnByb3BzIH0gPSB1c2VJbmZpbml0ZTxUb3BpY0Jyb3dzYWJsZT4oXG4gICAgKGluZGV4KSA9PiBgL2xpc3RpbmcvdG9waWNzP3BhZ2U9JHtpbmRleH1gXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b3BpY3M6IGRhdGEsXG4gICAgLi4ucHJvcHMsXG4gIH07XG59XG4iXX0=