import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import { FC } from 'react';

import DisplayTimeFrame from '../DisplayTimeFrame';
import { getTimeFrameWithConfig } from '../../utils';
import { JOURNEY_OP } from '.';
import messageIds from 'features/smartSearch/l10n/messageIds';
import { Msg } from 'core/i18n';
import UnderlinedMsg from '../../UnderlinedMsg';
import UnderlinedText from '../../UnderlinedText';
import useJourneys from 'features/journeys/hooks/useJourneys';
import { useNumericRouteParams } from 'core/hooks';
import useTags from 'features/tags/hooks/useTags';
import { ZetkinTag } from 'utils/types/zetkin';
import {
  JourneyFilterConfig,
  OPERATION,
  SmartSearchFilterWithId,
} from '../../types';

interface DisplayJourneyProps {
  filter: SmartSearchFilterWithId<JourneyFilterConfig>;
}
const localMessageIds = messageIds.filters.journey;

const DisplayJourney: FC<DisplayJourneyProps> = ({ filter }): JSX.Element => {
  const { orgId } = useNumericRouteParams();
  const op = filter.op || OPERATION.ADD;
  const {
    operator,
    journey: journeyId,
    after,
    before,
    tags: tagsObj,
  } = filter.config;
  const journeys = useJourneys(orgId).data || [];
  const journeyTitle = journeys?.find((item) => item.id === journeyId)?.title;
  const timeFrame = getTimeFrameWithConfig({
    after: after,
    before: before,
  });
  const { data } = useTags(orgId);
  const tags = data || [];

  const selectedTags = tagsObj?.ids.reduce((acc: ZetkinTag[], id) => {
    const tag = tags.find((tag) => tag.id === id);
    if (tag) {
      return acc.concat(tag);
    }
    return acc;
  }, []);

  const getCondition = () => {
    if (!tagsObj) {
      return (
        <UnderlinedMsg id={localMessageIds.condition.preview.regardlessTags} />
      );
    }

    if (tagsObj.min_matching) {
      return (
        <UnderlinedMsg
          id={localMessageIds.condition.preview.some}
          values={{
            minMatching: tagsObj.min_matching,
          }}
        />
      );
    } else {
      return (
        <UnderlinedMsg
          id={
            localMessageIds.condition.preview[
              tagsObj.condition as 'all' | 'any' | 'none'
            ]
          }
        />
      );
    }
  };

  return (
    <Msg
      id={localMessageIds.inputString}
      values={{
        addRemoveSelect: <UnderlinedMsg id={messageIds.operators[op]} />,
        condition: getCondition(),
        journeySelect: <UnderlinedText text={`"${journeyTitle}"`} />,
        operator: (
          <UnderlinedMsg
            id={
              localMessageIds[
                operator === JOURNEY_OP.OPEN
                  ? JOURNEY_OP.OPEN
                  : JOURNEY_OP.CLOSE
              ]
            }
          />
        ),
        statusText: (
          <Msg
            id={
              operator === 'opened'
                ? localMessageIds.thatOpened
                : localMessageIds.thatFinished
            }
          />
        ),
        tags: selectedTags ? (
          <Box alignItems="start" display="inline-flex">
            {selectedTags.map((t) => (
              <Chip
                key={t.id}
                label={t.title}
                size="small"
                sx={{ borderColor: t.color, margin: '2px', mt: 0.8 }}
                variant="outlined"
              />
            ))}
          </Box>
        ) : null,
        tagsDesc: selectedTags ? (
          <>
            <Msg id={localMessageIds.followingTags} /> :
          </>
        ) : null,
        timeFrame: <DisplayTimeFrame config={timeFrame} />,
      }}
    />
  );
};
export default DisplayJourney;
