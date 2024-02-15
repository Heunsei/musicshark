function freqToMidi(freq) {
    // MIDI 음계의 주파수 범위
    const midiRanges = [
        { note: '도', minFreq: 550, maxFreq: 556 },
        { note: '레', minFreq: 620, maxFreq: 623 },
        { note: '미', minFreq: 688, maxFreq: 694 },
        { note: '파', minFreq: 719, maxFreq: 724 },
        { note: '솔', minFreq: 795, maxFreq: 800 },
        { note: '라', minFreq: 875, maxFreq: 882 },
        { note: '시♭', minFreq: 934, maxFreq: 940 },
        { note: '시', minFreq: 995, maxFreq: 1001 },
        { note: '다음 도', minFreq: 1044, maxFreq: 1050 },
        { note: '다음 레', minFreq: 1160, maxFreq: 1173 }
    ];

    // 입력된 주파수와 MIDI 음계의 주파수 범위를 비교하여 해당하는 MIDI 음계 값을 찾음
    for (const { note, minFreq, maxFreq } of midiRanges) {
        if (freq >= minFreq && freq <= maxFreq) {
            // MIDI 음계 값 계산
            const midiValue = Math.round(12 * (Math.log(freq / 440.0) / Math.log(2))) + 69;
            return { note, midiValue };
        }
    }
    return null; // 주어진 주파수에 해당하는 MIDI 음계를 찾을 수 없을 때
}

// 모든 음에 대한 MIDI 노트 값을 계산하고 출력합니다.
for (let freq = 550; freq <= 1173; freq++) {
    const result = freqToMidi(freq);
    if (result) {
        console.log(`주파수 ${freq} Hz에 해당하는 MIDI 음계는 ${result.note}, MIDI 값은 ${result.midiValue}입니다.`);
    } else {
        console.log(`주파수 ${freq} Hz에 해당하는 MIDI 음계를 찾을 수 없습니다.`);
    }
}
