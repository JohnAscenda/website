import React from "react";
import Newsletter from "../../newsletter/newsletter";

const emailList = ({ color }) => {
  return (
    <div>
      <Newsletter
        color={color}
        title="Get my free Flutter Tips PDF"
        description="Level up your skills by joining 1000 other Flutter developers now! 😃"
        giveaway="When you sign up you are eligible to have a chance to win future courses"
        cta="LEVEL UP"
        img="/assets/icons/sprite_amazed.webp"
        action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca"
      />
    </div>
  );
};

export default emailList;
