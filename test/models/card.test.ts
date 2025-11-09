import {
  CDSHookCard,
  CDSHookCardSource,
  CDSHookCardLink,
} from '../../src/models/card';

describe('CDSHookCardSource', () => {
  it('should create an instance with provided values', () => {
    const source = new CDSHookCardSource({
      label: 'Test Source',
      url: 'https://example.com',
      icon: 'https://example.com/icon.png',
    });

    expect(source.label).toBe('Test Source');
    expect(source.url).toBe('https://example.com');
    expect(source.icon).toBe('https://example.com/icon.png');
  });

  it('should create an instance with only required fields', () => {
    const source = new CDSHookCardSource({
      label: 'Required Source',
    });

    expect(source.label).toBe('Required Source');
    expect(source.url).toBeUndefined();
    expect(source.icon).toBeUndefined();
  });
});

describe('CDSHookCardLink', () => {
  it('should create an instance with provided values', () => {
    const link = new CDSHookCardLink({
      label: 'Test Link',
      url: 'https://example.com/link',
    });

    expect(link.label).toBe('Test Link');
    expect(link.url).toBe('https://example.com/link');
  });
});

describe('CDSHookCard', () => {
  it('should create an instance with basic values', () => {
    const card = new CDSHookCard({
      summary: 'Test Summary',
      detail: 'Test Detail',
      indicator: 'info',
    });

    expect(card.summary).toBe('Test Summary');
    expect(card.detail).toBe('Test Detail');
    expect(card.indicator).toBe('info');
  });

  it('should create an instance with nested source', () => {
    const card = new CDSHookCard({
      summary: 'Test Summary',
      source: {
        label: 'Test Source',
        url: 'https://example.com',
      },
    });

    expect(card.summary).toBe('Test Summary');
    expect(card.source).toBeInstanceOf(CDSHookCardSource);
    expect(card.source?.label).toBe('Test Source');
    expect(card.source?.url).toBe('https://example.com');
  });

  it('should create an instance with nested links', () => {
    const card = new CDSHookCard({
      summary: 'Test Summary',
      links: [
        { label: 'Link 1', url: 'https://example.com/1' },
        { label: 'Link 2', url: 'https://example.com/2' },
      ],
    });

    expect(card.summary).toBe('Test Summary');
    expect(card.links).toHaveLength(2);
    expect(card.links?.[0]).toBeInstanceOf(CDSHookCardLink);
    expect(card.links?.[0].label).toBe('Link 1');
    expect(card.links?.[1].label).toBe('Link 2');
  });

  it('should create an instance using from factory method', () => {
    const card = CDSHookCard.from({
      summary: 'Factory Summary',
      indicator: 'warning',
      source: {
        label: 'Factory Source',
      },
    });

    expect(card).toBeInstanceOf(CDSHookCard);
    expect(card.summary).toBe('Factory Summary');
    expect(card.indicator).toBe('warning');
    expect(card.source).toBeInstanceOf(CDSHookCardSource);
  });

  it('should handle all indicator types', () => {
    const infoCard = new CDSHookCard({ summary: 'Info', indicator: 'info' });
    const warningCard = new CDSHookCard({ summary: 'Warning', indicator: 'warning' });
    const hardStopCard = new CDSHookCard({ summary: 'Hard Stop', indicator: 'hard-stop' });

    expect(infoCard.indicator).toBe('info');
    expect(warningCard.indicator).toBe('warning');
    expect(hardStopCard.indicator).toBe('hard-stop');
  });

  it('should create an instance without optional fields', () => {
    const card = new CDSHookCard({
      summary: 'Minimal Summary',
    });

    expect(card.summary).toBe('Minimal Summary');
    expect(card.detail).toBeUndefined();
    expect(card.indicator).toBeUndefined();
    expect(card.source).toBeUndefined();
    expect(card.links).toBeUndefined();
  });
});
