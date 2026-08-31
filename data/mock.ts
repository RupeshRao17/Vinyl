import type { Album, ActivityItem, DiaryEntry, Friend, List, RankedEntry } from '../types/models';

export const albums: Album[] = [
  {
    id: 'rumours',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    year: 1977,
    genre: 'Rock',
    durationLabel: '39:52',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsnLhNXeMI4nbKuzdN4p56jO8SzlhXeKOvolW2D554yyWzASMGwXV02pFPAz_g9CUoVhd-pWawbCeAzxnVGyTCXjtdv74UG2YFTt5a3aRfAncC3lrkfofM8BbG3f5IAPyQ3Z9bD5RoAAQFlpzCpaNB4oeJCHpvmm8_L8Hp_cQfwXiMcoTX84AmEUCIWR8zPyXJMSzKRo2U2A6Zra8435gsDTp8UvgURUu4qsR1gSFKN4fMPH0GqYo5',
  },
  {
    id: 'whats-going-on',
    title: "What's Going On",
    artist: 'Marvin Gaye',
    year: 1971,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBidBwjx6pTWlwvinvx_sh1gnSnRxzNf9rz2vJqpEQYTyM5qVNAvdv5iDUvf2bekIDhLdC2h7u3oDj3B_EBuHs4kRLxQjrcmySK5xJHivtSc8iASIVit4AgXi7RN_oHJ0fYJakIbo30BNANTIQFMFDkBaJXhnFu-v9sTCAZ54JCp-wQvDVC9XPWAOllloMY9VSpLUYr1nQDVMi0PiJ7uj-dOCPn17cxrMki-Pwzu7fhqwicoSN8_21J',
  },
  {
    id: 'kind-of-blue',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    year: 1959,
    genre: 'Jazz',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLPFF8sARNQ57jF8X21GB8ZLGhH4UtjjxMFWRWWbFJ4HQEde7jKlZ4D_TnepH08qjnb6HmzK3SAeMxdTlMDkjRGoTFm2YAqmfp1Q9cQhCCm8yJgz_OuywkCQVwmg65rqIYKgM8Cq1gtMP5Ew7JryvbXzhcufHFum_oMD1GEWt2_t39X7mO-Zh5plyTZ4iEHGzBpWI0If4xzv2HbEDZuM-ku3ZciMdmJ9pdB7HpMcD94vQOqgsvu6v8',
  },
  {
    id: 'the-sun-fades',
    title: 'The Sun Fades',
    artist: 'Analog Echoes',
    year: 1974,
    genre: 'Jazz',
    durationLabel: '42:15',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaDBevbSJ4HC25v1p3Ci-Fo61YPVmjIGbAD-Pf6q5UGcxVJ9Gevo4D43g7al7bECtgVAdM7zeQIcK8rsoflHWRoMK8NrWNhfGYTR-I0LI39MY5pDnDlAqlpw3wVP3mmWciQZ_LkD1gRhzJ_zREz-zXWgFbMOiD4aRHlZdTgQoObwMwfNFhe-gXBqQweCE3flh3nGGQA1QLUPEpWWMnLciei3BqsWhABCbJfVrap6QdCaEGRkLa58nK',
    tracklist: [
      { id: 't1', title: 'Morning Fade', duration: '4:12' },
      { id: 't2', title: 'Dust Motes', duration: '3:45' },
      { id: 't3', title: 'Warm Static', duration: '5:30' },
    ],
  },
  {
    id: 'a-love-supreme',
    title: 'A Love Supreme',
    artist: 'John Coltrane',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mt43P6h-9aDxYABZPjNSNPAnm9WSSOQrPFHdVgPQXak0AIEl_mm3pkRyrq1cFsC4ZA0NNam4OQCHJdNyhBoZs6WjW1DSD1s4LQA1rLOpHxygAT3yrD9L9vKXlrb6L3jqGR8N24_q015al4pxVp7d_pN_R4aaKhsDXk8mdMiv4PBXc4Sy9YXlLZVNzOvY6V4USgAmDuGwmP_80LZdcSMTkd5Boo-aEwrR0f744WfouNlK9n0NoplW',
  },
  {
    id: 'blue',
    title: 'Blue',
    artist: 'Joni Mitchell',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZet0NGNKBP1n3YQQ8JuEl3kRfVd4JoCFUcxQPrMtXrloAnmWFynkVvWBUuD_DJ80yP267qu-9yyX6w0cg05SmNOXpGfBh7iWetEB_V2VjlaJNXc8rjvMQE_2rdd1Jq-wRGTVlH2n9TlAgeeQ9hT7HEptfcITMJgpUXIZ7zYtBRCmbekpDMahzHgU5F_KZIuZmNba-m4l7oenCKeNcQtDRYktnMMzatqmpurH2jcYXPu3Jw0gx1uvX',
  },
  {
    id: 'music-has-the-right',
    title: 'Music Has The Right To Children',
    artist: 'Boards of Canada',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRbfECYJrYrlTG_RjrmBSW2a1ltbELA5DwFYhoEPRtVR5xQ9d3HPTQ6mV_kZvNucVqZk1MKKCmj7A1_wHmQtjkeB_dBrmAM3iX_XKrRftE_47r0ln-40BGABhFNAy72JlF-1RtJ32l8zoC8htS-EN1uWleYeSoRISBDo1cqT57gLaPNJ519HLuaRvLOAWJlDi_NsFXCgKafZoiHefSviSKqKCSYyzmDSQKlV5XBV1NtMKLo_xrwpf6',
  },
  {
    id: 'unknown-pleasures',
    title: 'Unknown Pleasures',
    artist: 'Joy Division',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfFaJHx7jvJxny6tyDYyk1V6tZ_AYbys1wlhR25UlZKxycY7HvP0aBvIwY79YN_Joz_o-tbgHIi2GPAgtu8mG0kbpbTg8VdkZK-zGTMGJ4FjXxdjjUpHzBPbSrhA31M_BK_LVLo1S--E3KEBmtREeHt7F2olGAjXUm2Dgwb9Ll7trChjacs4aMhigTmAaoJTdmFUCLch7i44m-2HWtO2uJjU8ZvF9mM39tXI7uGbRI1v7SLp3m6hWJ',
  },
  {
    id: 'time-out',
    title: 'Time Out',
    artist: 'The Dave Brubeck Quartet',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzSZIFPNa9LRULYb7e50XhmDzYRcxnqZnQtthzFxXosiFoLBUWRPj50WrQkmXbExnBGgdN0ZoYIsPhqIamljH_ei-aNlHUvQNLldiKa9zzUsLC18emlrs2Ifp_be2_DCULyiHciuXsHYycIVmbsL8kmo2WBXzTGqWfjKepP40_MvpeB0nFbSjTmbdaXWpFvJ5FfUL7J5PekzEnHTIG94PCXX9VTANTiIvyL9TNEdZtSrDrfD6Km7yc',
  },
  {
    id: 'turn-on-the-bright-lights',
    title: 'Turn On The Bright Lights',
    artist: 'Interpol',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKCSjcxRa2JwlVWuzzxgZayzB1gjrzdDmBFhUTS5vJ7O3-Pw_3qPgX4m_opJIF3jiiYP1tPvn5DqeCtPQe8CLvyREMPH-khtYTSV-9z8MC7xisQx7XAqxdjX0SWZrH1hIm3j3F9h7eRkhnpe70VTh1mZzuWBVi5rSsziIujHF7mKEjEPB8EF4xhtKGdzDXbUwTrUT4qS42FUUHH0MPwgI8bZUD-a_V5ZhIFBtZ0-IG0AOfPVOPz_kO',
  },
  {
    id: 'dark-side-of-the-moon',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSkg4JugZLxSCAp8M-nKeZ9orFZ6BqOHmHK0zqIO0N9s7xTCXBk4vha_s0nqh7wtyanKCF2GGWiVmaJ_YBPg3NmnFZu-Alt3zWV7O2vUOTN4Kko22Jr820jZaC-9abkF-ri6k7EI7YwOwb7uEtRX7bdYfr4-KwF_fGO8WirITqM_TSkp2Tyj2nEbyuciStdpZML_9PtA_LWWx2RuQyhqqyLT4V7q1ZvBvoJ-IfbQdIFQ1WdfLeyi-f',
  },
  {
    id: 'in-rainbows',
    title: 'In Rainbows',
    artist: 'Radiohead',
    year: 2007,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCu3jV_RFxRFu8YoZd7D4JSgGx--0m7jMKqzSrL4plWqB4X1s9PmHhYn4mhN7vuzZzTRGklI_1Ru_3-uuaRUMr5VfWbGWE0S6tsGRo2MuxFfjzHNsqv9ifqag_O8i73uuCQO_c4pruZkg0zUT7TX3AC0ZXEynRclNxCOiWyns7z2MQwiWDiwKTxeuO0K0TnUY0SWQb1MoQzQQ1ejgl9v7H4_BAd9szwxIFhaCAmlZfO43_jjt8k1QQt',
  },
];

const byId = (id: string) => albums.find((a) => a.id === id)!;

export const diaryEntries: DiaryEntry[] = [
  {
    id: 'd1',
    album: byId('rumours'),
    rating: 4.5,
    review:
      'The pressing sounds incredibly warm. You can almost feel the tension in the room during "The Chain."',
    dateLabel: 'OCT 24, 1974',
  },
  {
    id: 'd2',
    album: byId('whats-going-on'),
    rating: 5,
    review:
      'A masterpiece. The layered vocals on the title track wrap around you like a heavy, comforting blanket.',
    dateLabel: 'OCT 22, 1974',
  },
  {
    id: 'd3',
    album: byId('kind-of-blue'),
    rating: 4,
    review: 'Perfect for a rainy Sunday morning.',
    dateLabel: 'OCT 22, 1974',
  },
];

export const rankedList: RankedEntry[] = albums.slice(0, 9).map((album, i) => ({
  rank: i + 1,
  album,
}));

export const lists: List[] = [
  {
    id: 'top-100',
    title: 'Top 100 All-Time',
    description: 'A curated journey through sonic perfection. Updated weekly.',
    albumIds: albums.slice(0, 9).map((a) => a.id),
  },
  {
    id: 'sunday-mornings',
    title: 'Sunday Morning Records',
    description: 'Slow, warm, and easy — for coffee and no plans.',
    albumIds: [albums[2].id, albums[3].id, albums[5].id],
  },
];

export const friends: Friend[] = [
  { id: 'f1', name: 'Sarah J.' },
  { id: 'f2', name: 'Marcus T.' },
  { id: 'f3', name: 'Elena L.', initials: 'EL' },
];

export const activityFeed: ActivityItem[] = [
  {
    id: 'a1',
    user: friends[0],
    action: 'logged',
    album: byId('dark-side-of-the-moon'),
    rating: 4.5,
    review:
      'Revisiting this classic on a rainy Sunday. The transition from Speak to Me into Breathe still gives me chills.',
    timeLabel: '2h ago',
  },
  {
    id: 'a2',
    user: friends[1],
    action: 'logged',
    album: byId('in-rainbows'),
    rating: 5,
    review: "Perfection from start to finish. Finally picked up the 45rpm pressing and it's a revelation.",
    timeLabel: '5h ago',
  },
  {
    id: 'a3',
    user: friends[2],
    action: 'logged',
    album: byId('kind-of-blue'),
    rating: 4,
    review: 'Late night listening. Never gets old.',
    timeLabel: '1d ago',
  },
];
