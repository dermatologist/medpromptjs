import { LLMLoop } from '../../src/llm_loop/base';
import bootstrap from './bootstrap';

jest.setTimeout(60000);

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;

  beforeAll(async () => {
    const _container = await bootstrap();
    llmLoop = new LLMLoop(_container, '', '');
  });

  it('should check assertion correctly', async () => {
    const expression = `
     exists (
        [DocumentReference] D
        where D.allergies="Penicillin"
        and D.complaint="Headache"
        and D.complaint="Weakness" or D.complaint="Numbness"
        and D.findings="Intact sensation to light touch"
        )
      `;
    const context = `
      Patient is a 48 year-old well-nourished Hispanic male with a 2-month
      history of Rheumatoid Arthritis and strong family history of autoimmune diseases presenting after
      an episode of lightheadedness and muscle weakness.
      Patient began experiencing symptoms 4 months ago (November 2017). At that time he experienced
      fatigue and joint pain in the knees and hands. He was diagnosed with Rheumatoid Arthritis. He was
      given a short course of corticosteroids at that time that alleviated his symptoms. He was also
      started on methotrexate at that time. However, he felt that the medication was ineffective and
      stopped after 2 weeks.
      For the past two months, the patient has been experiencing worsening symptoms. He has been
      experiencing progressively worsening headaches accompanied with lightheadedness, light and
      sound sensitivity, nausea, and vomiting. He reports no loss of consciousness associated with the
      headaches. No convulsion, change of vision, or loss of continence. When the headaches began 2
      months ago, they would last about half of a day and occur approximately once per week. They
      increased in frequency and duration and over the last month have been almost daily and lasted
      most of the day. He is unable to eat during headaches. Concurrently, the patient is experiencing
      worsening joint pain in the knees and hands. The pain is constant, accompanied by swollen and hot
      joints, and not alleviated by NSAIDS. Also in the last two months, he has experienced a dry mouth
      that makes swallowing food difficult and a burning sensation in his eyes.
      In the last month, the patient has been experiencing night sweats, chills, and subjective fevers
      almost every night. This has impacted his sleep significantly, and he has not been able to sleep more
      than 4 consecutive hours in over one month. Three days ago, the patient was at work when a
      headache came on, he felt particularly light headed and weak. His left work early on that day. In the
      last three days the patient has had a constant headache and lightheadedness, and felt unable to eat.
      When he has tried to eat, he has vomited immediately after eating. He has had no changes to his
      bowel movements. No blood in the stool or urine. The joint pain has returned to a 10/10 in severity
      in the past 3 days. The patient has felt too weak to walk or leave the bedroom. He was brought to
      the hospital by his sister, a nurse, after two days being unable to leave bed.

          *   The document contains a record of a penicillin allergy.
    *   The document records a headache as a complaint.
    *   The document records either weakness or numbness as a complaint.
    *   The document indicates intact sensation to light touch as a finding.
    `;
    const result = await llmLoop.checkAssertion(expression, context);
    expect(result).toBe(true);
  });

  it('should check mention correctly', async () => {
    const result = await llmLoop.checkMention('test', 'test');
    expect(result).toBe(true);
  });

  it('should check negation correctly', async () => {
    const result = await llmLoop.checkNegation('test', 'test');
    expect(result).toBe(true);
  });
});
