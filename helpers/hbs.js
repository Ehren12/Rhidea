const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).utc().format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  editIcon: function (ideaUser, loggedUser, ideaId, floating = true) {
    if (ideaUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/ideas/edit/${ideaId}" class="btn-floating halfway-fab "><svg width="30" height="30" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 7">
        <circle id="Ellipse 1" cx="27.5" cy="27.5" r="27.5" fill="#9D9ABA"/>
        <g id="edit 1" clip-path="url(#clip0)">
        <g id="Group">
        <path id="Vector" d="M17.2515 37.7859L20.8353 41.3697L11.3871 43.6037L13.6212 34.1556L17.2515 37.7859Z" fill="#9D9ABA"/>
        <path id="Vector_2" d="M38.2888 23.9628L20.9284 41.3231L20.8353 41.3697L17.2515 37.7859L34.6585 20.3325L38.2888 23.9628Z" fill="#9D9ABA"/>
        <path id="Vector_3" d="M34.6584 20.3325L17.2515 37.7859L13.6212 34.1556L13.6677 34.0625L31.0281 16.7021L34.6584 20.3325Z" fill="#9D9ABA"/>
        </g>
        <path id="Vector_4" d="M44.5719 17.6332L37.3578 10.4191C36.7993 9.86063 35.915 9.86063 35.403 10.4191L30.0506 15.7249L12.6904 33.0853C12.5973 33.1784 12.5042 33.318 12.4111 33.4577L12.3646 33.5508C12.3181 33.6439 12.2715 33.737 12.2715 33.8301L10.0374 43.2781C9.94432 43.7436 10.0839 44.2555 10.4098 44.5813C10.6891 44.8606 11.0149 45.0002 11.3871 45.0002C11.4802 45.0002 11.6198 45.0002 11.7129 44.9537L21.161 42.7196C21.2541 42.6731 21.3472 42.6731 21.4403 42.6265L21.5334 42.58C21.673 42.5335 21.8127 42.4404 21.9058 42.3008L39.2661 24.9404L44.5719 19.588C45.1305 19.0295 45.1305 18.1452 44.5719 17.6332ZM31.0281 18.6572L32.7036 20.3327L17.2515 35.8313L15.576 34.1558L31.0281 18.6572ZM13.2488 41.7422L14.3659 36.9483L18.0427 40.6252L13.2488 41.7422ZM20.8353 39.4151L19.2062 37.7861L34.6584 22.2874L36.3339 23.9629L20.8353 39.4151ZM38.2888 21.9616L33.0294 16.7024L36.3805 13.3513L41.6398 18.6107L38.2888 21.9616Z" fill="white"/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="35" height="35" fill="white" transform="translate(10 10)"/>
        </clipPath>
        </defs>
        </svg>
        </a>`;
      } else {
        return `<a href="/ideas/edit/${ideaId}"><svg width="30" height="30" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 7">
        <circle id="Ellipse 1" cx="27.5" cy="27.5" r="27.5" fill="#9D9ABA"/>
        <g id="edit 1" clip-path="url(#clip0)">
        <g id="Group">
        <path id="Vector" d="M17.2515 37.7859L20.8353 41.3697L11.3871 43.6037L13.6212 34.1556L17.2515 37.7859Z" fill="#9D9ABA"/>
        <path id="Vector_2" d="M38.2888 23.9628L20.9284 41.3231L20.8353 41.3697L17.2515 37.7859L34.6585 20.3325L38.2888 23.9628Z" fill="#9D9ABA"/>
        <path id="Vector_3" d="M34.6584 20.3325L17.2515 37.7859L13.6212 34.1556L13.6677 34.0625L31.0281 16.7021L34.6584 20.3325Z" fill="#9D9ABA"/>
        </g>
        <path id="Vector_4" d="M44.5719 17.6332L37.3578 10.4191C36.7993 9.86063 35.915 9.86063 35.403 10.4191L30.0506 15.7249L12.6904 33.0853C12.5973 33.1784 12.5042 33.318 12.4111 33.4577L12.3646 33.5508C12.3181 33.6439 12.2715 33.737 12.2715 33.8301L10.0374 43.2781C9.94432 43.7436 10.0839 44.2555 10.4098 44.5813C10.6891 44.8606 11.0149 45.0002 11.3871 45.0002C11.4802 45.0002 11.6198 45.0002 11.7129 44.9537L21.161 42.7196C21.2541 42.6731 21.3472 42.6731 21.4403 42.6265L21.5334 42.58C21.673 42.5335 21.8127 42.4404 21.9058 42.3008L39.2661 24.9404L44.5719 19.588C45.1305 19.0295 45.1305 18.1452 44.5719 17.6332ZM31.0281 18.6572L32.7036 20.3327L17.2515 35.8313L15.576 34.1558L31.0281 18.6572ZM13.2488 41.7422L14.3659 36.9483L18.0427 40.6252L13.2488 41.7422ZM20.8353 39.4151L19.2062 37.7861L34.6584 22.2874L36.3339 23.9629L20.8353 39.4151ZM38.2888 21.9616L33.0294 16.7024L36.3805 13.3513L41.6398 18.6107L38.2888 21.9616Z" fill="white"/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="35" height="35" fill="white" transform="translate(10 10)"/>
        </clipPath>
        </defs>
        </svg>
        </i></a>`;
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
