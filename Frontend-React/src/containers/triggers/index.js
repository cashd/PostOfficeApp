import React from 'react'

const Triggers = () => (
  <div>
    <p>
      {'/*Trigger for package table, BEFORE INSERT, or upon acceptance of a package/letter, the delivery_status \n' +
      '  of \'Label Created\' will populate the date_received field in package with the current server time */\n' +
      '\n' +
      'CREATE DEFINER=`team9`@`%` TRIGGER `PostOffice`.`package_BEFORE_INSERT` BEFORE INSERT ON `package` \n' +
      'FOR EACH ROW\n' +
      '\n' +
      'BEGIN\n' +
      ' \n' +
      ' if(New.delivery_status = \'Label Created\') then\n' +
      '\n' +
      '  set NEW.date_received = NOW(); -- Correction that can be applied in case we want Houston local time displayed - INTERVAL 5 HOUR;\n' +
      '\n' +
      ' end if;\n' +
      '\n' +
      'END\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '/*Trigger for package table, BEFORE UPDATE, or upon delivery of a package/letter, the delivery_status \n' +
      '  of \'Delivered\' will populate the date_received field in package with the current server time */\n' +
      '\n' +
      'CREATE DEFINER=`team9`@`%` TRIGGER `PostOffice`.`package_BEFORE_UPDATE` BEFORE UPDATE ON `package` FOR EACH ROW\n' +
      '\n' +
      'BEGIN\n' +
      '\n' +
      ' if(New.delivery_status = \'Delivered\') then\n' +
      '\n' +
      '  set NEW.date_delivered = NOW(); -- Correction that can be applied in case we want Houston time displayed - INTERVAL 5 HOUR;\n' +
      '\n' +
      ' end if;\n' +
      '\n' +
      'END\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '/*Trigger for tracking table, BEFORE INSERT, or upon creation. One type of trigger: when a tracking event_type is \n' +
      '  entered, the date the package arrived and received will also be set in the package entity (delivery_status). \n' +
      '  A second type of trigger: when all the event_types are entered in the tracking entity, the time_of_event will \n' +
      '  be populated with the current datetime */\n' +
      '\n' +
      'CREATE DEFINER=`team9`@`%` TRIGGER `PostOffice`.`tracking_BEFORE_INSERT` BEFORE INSERT ON `tracking` FOR EACH ROW\n' +
      '\n' +
      'BEGIN\n' +
      '--Trigger One type: Upon creation of an event_type in tracking, the package table/delivery_status will be updated\n' +
      ' \n' +
      'if(new.event_type = \'Label Created\')then\n' +
      '\n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'Label Created\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      '  end if;\n' +
      '\n' +
      '\n' +
      '--Trigger Two type: Upon creation of an event_type, the tracking table/time_of_event will be populated with current server time\n' +
      ' if(new.event_type = \'Label Created\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- correction that can be applied in case we want to display Houston time - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      '\n' +
      ' if(new.event_type = \'Dropped Off\')then\n' +
      '  \n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'Drop Off\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      '  end if;\n' +
      '\n' +
      '\n' +
      ' if(new.event_type = \'Dropped Off\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '  \n' +
      '\n' +
      '\n' +
      ' if(new.event_type = \'Arrived to Facility\')then\n' +
      '  \n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'In Sorting\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Arrived to Facility\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Left Facility\')then\n' +
      '   \n' +
      '   update package\n' +
      '   \n' +
      '    set package.delivery_status = \'In Transit\'\n' +
      '    \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Left Facility\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '  \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'In Vehicle\')then\n' +
      '   \n' +
      '   update package\n' +
      '    \n' +
      '    set  package.delivery_status = \'In Transit\'\n' +
      '   \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Off Vehicle\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Out for Delivery\')then\n' +
      '   \n' +
      '   update package\n' +
      '   \n' +
      '    set package.delivery_status = \'Out for Delivery\'\n' +
      '   \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Out for Delivery\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '\n' +
      ' \n' +
      '\n' +
      ' if(NEW.event_type = \'Delivered\')then\n' +
      ' \n' +
      '   update package SET package.delivery_status = \'Delivered\'\n' +
      '    \n' +
      '   WHERE NEW.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Delivered\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '\n' +
      '\n' +
      'END\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '/*Trigger for tracking table, BEFORE UPDATE, or when tracking event is updated. One type of trigger: when a \n' +
      '  tracking event_type is entered, the package/delivery_status will be updated to match the tracking/event_type. \n' +
      '  A second type of trigger: when all the event_types are updated in the tracking entity, the time_of_event will \n' +
      '  be populated with the current datetime */\n' +
      '\n' +
      'CREATE DEFINER=`team9`@`%` TRIGGER `PostOffice`.`tracking_BEFORE_UPDATE` BEFORE UPDATE ON `tracking` FOR EACH ROW\n' +
      '\n' +
      'BEGIN\n' +
      '--Trigger One type: Upon update of an event_type in tracking, the package table/delivery_status will be updated\n' +
      ' \n' +
      'if(new.event_type = \'Label Created\')then\n' +
      '  \n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'Label Created\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      '\n' +
      '\n' +
      '--Trigger Two type: Upon update of tracking event_type, the tracking table/time_of_event will be populated with current server time\n' +
      ' if(new.event_type = \'Label Created\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- Correction that can be applied in case we want to display Houston time - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      '\n' +
      ' if(new.event_type = \'Dropped Off\')then\n' +
      '  \n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'Drop Off\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      '\n' +
      '\n' +
      ' if(new.event_type = \'Dropped Off\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '  \n' +
      '\n' +
      ' if(new.event_type = \'Arrived to Facility\')then\n' +
      '  \n' +
      '   update package\n' +
      '  \n' +
      '    SET package.delivery_status =\'In Sorting\'\n' +
      '  \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Arrived to Facility\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '   \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Left Facility\') then\n' +
      '   \n' +
      '   update package\n' +
      '   \n' +
      '    set package.delivery_status = \'In Transit\'\n' +
      '   \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Left Facility\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'In Vehicle\')then\n' +
      '   \n' +
      '   update package\n' +
      '    \n' +
      '    set package.delivery_status = \'In Transit\'\n' +
      '   \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Off Vehicle\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Out for Delivery\') then\n' +
      '   \n' +
      '   update package\n' +
      '   \n' +
      '    set package.delivery_status = \'Out for Delivery\'\n' +
      '   \n' +
      '   where new.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Out for Delivery\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '  \n' +
      ' \n' +
      '\n' +
      ' if(NEW.event_type = \'Delivered\') then\n' +
      ' \n' +
      '   update package \n' +
      '   \n' +
      '    SET package.delivery_status = \'Delivered\'\n' +
      '    \n' +
      '   WHERE NEW.package_fk_id = package.package_id;\n' +
      ' \n' +
      ' end if;\n' +
      ' \n' +
      '\n' +
      ' if(new.event_type = \'Delivered\')then\n' +
      '  \n' +
      '   set NEW.time_of_event = NOW(); -- - INTERVAL 5 HOUR;\n' +
      ' \n' +
      ' end if;\n' +
      '\n' +
      '\n' +
      'END\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '/*Trigger that will not allow an employee that is under 18 to be entered into employee table*/\n' +
      'CREATE DEFINER=`team9`@`%` TRIGGER `PostOffice`.`employee_BEFORE_INSERT` \n' +
      'BEFORE INSERT ON `employee` FOR EACH ROW\n' +
      '\n' +
      'BEGIN\n' +
      '\n' +
      'if(timestampdiff(YEAR, NEW.employee_date_birth, CURDATE()) < 18) then\n' +
      '  \n' +
      '  signal SQLSTATE \'45000\' SET message_text = \'Employee is under 18- please re- enter\';\n' +
      '\n' +
      'end if;\n' +
      '\n' +
      'END'}
    </p>
  </div>
);

export default Triggers