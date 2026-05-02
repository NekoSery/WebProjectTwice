// Members Page JavaScript

// Member Data
const membersData = {
    nayeon: {
        name: 'Nayeon',
        koreanName: '임나연',
        role: 'Lead Vocalist',
        birthdate: 'September 22, 1995',
        nationality: 'Korean',
        mbti: 'ISTP',
        representativeColor: '#5bcefa',
        bio: 'Im Nayeon is a South Korean singer under JYP Entertainment. She is the lead vocalist of TWICE and was the first member to be revealed to the public. Known for her bright and cheerful personality, Nayeon often takes center position in performances. She made her solo debut with the mini album "IM NAYEON" in June 2022.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    },
    jeongyeon: {
        name: 'Jeongyeon',
        koreanName: '유정연',
        role: 'Lead Vocalist',
        birthdate: 'November 1, 1996',
        nationality: 'Korean',
        mbti: 'ISTJ',
        representativeColor: '#a8d8ea',
        bio: 'Yoo Jeong-yeon is a South Korean singer under JYP Entertainment. She is known for her unique vocal tone and short hair style that became her signature look. Jeongyeon is the younger sister of actress Gong Seung-yeon. She brings a calm and reliable presence to the group.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    },
    momo: {
        name: 'Momo',
        koreanName: '모모 (平井もも)',
        role: 'Main Dancer, Sub Vocalist',
        birthdate: 'November 9, 1996',
        nationality: 'Japanese',
        mbti: 'INFP',
        representativeColor: '#ff9a9e',
        bio: 'Hirai Momo is a Japanese singer and dancer under JYP Entertainment. Known as the dancing machine of TWICE, Momo is renowned for her incredible dance skills and powerful performances. She trained for many years and her dedication to dance is unmatched. She is in a relationship with Super Junior\'s Heechul.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    },
    sana: {
        name: 'Sana',
        koreanName: '사나 (湊崎紗夏)',
        role: 'Vocalist',
        birthdate: 'December 29, 1996',
        nationality: 'Japanese',
        mbti: 'ENFP',
        representativeColor: '#fbc2eb',
        bio: 'Minatozaki Sana is a Japanese singer under JYP Entertainment. Known for her cute and bubbly personality, Sana became famous for her "Shy Shy Shy" line in "Cheer Up." She has a bright energy that lights up any room and is loved by fans worldwide for her adorable charm.',
        image: 'Sana3.jpg',
        instagram: '#',
        twitter: '#',
        gallery: [
            'Sana1.jpg',
            'Sana2.jpg',
            'Sana3.jpg',
            'Sana4.jpg',
            'Sana5.jpg',
            'Sana6.jpg'
        ]
    },
    jihyo: {
        name: 'Jihyo',
        koreanName: '박지효',
        role: 'Leader, Main Vocalist',
        birthdate: 'February 1, 1997',
        nationality: 'Korean',
        mbti: 'ISFP',
        representativeColor: '#ffd93d',
        bio: 'Park Ji-hyo is a South Korean singer under JYP Entertainment. As the leader and main vocalist of TWICE, Jihyo trained for 10 years before debuting. She is known for her powerful vocals and stable live performances. She made her solo debut with the mini album "ZONE" in August 2023.',
        image: 'jihyo1.jpg',
        instagram: '#',
        twitter: '#',
        gallery: [
            'jihyo1.jpg',
            'jihyo2.jpg',
            'jihyo3.jpg',
            'jihyo4.jpg',
            'jihyo5.jpg',
            'jihyo6.jpg'
        ]
    },
    mina: {
        name: 'Mina',
        koreanName: '미나 (名井南)',
        role: 'Lead Dancer, Sub Vocalist',
        birthdate: 'March 24, 1997',
        nationality: 'Japanese-American',
        mbti: 'ISFP',
        representativeColor: '#a8e6cf',
        bio: 'Myoi Mina is a Japanese-American singer and dancer under JYP Entertainment. Known for her elegant ballet-influenced dancing style, Mina brings grace to every performance. She was born in Texas, USA, and moved to Japan at a young age. Her calm and gentle personality makes her beloved by fans.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    },
    dahyun: {
        name: 'Dahyun',
        koreanName: '김다현',
        role: 'Lead Rapper, Sub Vocalist',
        birthdate: 'May 28, 1998',
        nationality: 'Korean',
        mbti: 'ISFJ',
        representativeColor: '#ffffff',
        bio: 'Kim Da-hyun is a South Korean singer and rapper under JYP Entertainment. Known for her bright smile and iconic eagle dance, Dahyun is a talented rapper with great stage presence. She is also known for her positive energy and ability to make anyone smile.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    },
    chaeyoung: {
        name: 'Chaeyoung',
        koreanName: '손채영',
        role: 'Main Rapper, Sub Vocalist',
        birthdate: 'April 23, 1999',
        nationality: 'Korean',
        mbti: 'INFP',
        representativeColor: '#ff6b6b',
        bio: 'Son Chae-young is a South Korean singer and rapper under JYP Entertainment. As the main rapper of TWICE, Chaeyoung is known for her unique rap style and artistic talents. She enjoys drawing and has contributed to writing lyrics for several TWICE songs. Her creative spirit and fashion sense make her stand out.',
        image: 'son chaeyoung edit !!.jpg',
        instagram: '#',
        twitter: '#',
        gallery: [
            'son chaeyoung edit !!.jpg',
            'Chaeyoung poster.jpg',
            'CHAEYOUNG TWICE COSMOPOLITAN MAGAZINE.jpg',
            'Chaeyoung Twice poster.jpg',
            'chae.jpg',
            'chaeee.jpg'
        ]
    },
    tzuyu: {
        name: 'Tzuyu',
        koreanName: '쯔위 (周子瑜)',
        role: 'Lead Dancer, Sub Vocalist, Visual',
        birthdate: 'June 14, 1999',
        nationality: 'Taiwanese',
        mbtI: 'ISFP',
        representativeColor: '#c7ceea',
        bio: 'Chou Tzu-yu is a Taiwanese singer and dancer under JYP Entertainment. Known for her stunning visuals, Tzuyu is often called the visual of the group. Despite being the youngest, she has a mature and elegant presence. She is loved for her kind heart and dedication to her craft.',
        image: 'TWICE.jpg',
        instagram: '#',
        twitter: '#'
    }
};

// Open Member Modal
function openMemberModal(memberId) {
    const modal = document.getElementById('memberModal');
    const modalBody = document.getElementById('modalBody');
    const member = membersData[memberId];
    
    if (!member) return;
    
    // Build modal content
    let galleryHTML = '';
    
    // Add gallery for Chaeyoung
    // if (memberId === 'jihyo' && member.gallery) {
    //     galleryHTML = `
    //         <div class="jihyo-gallery">
    //             <h4><i class='bx bx-images'></i> Photo Gallery</h4>
    //             <div class="gallery-grid">
    //                 ${member.gallery.map((img, index) => `
    //                     <div class="gallery-item" onclick="openLightbox('${img}')">
    //                         <img src="${img}" alt="jihyo ${index + 1}">
    //                     </div>
    //                 `).join('')}
    //             </div>
    //         </div>
    //     `;
    // }

    if (memberId === 'sana' && member.gallery) {
        galleryHTML = `
            <div class="sana-gallery">
                <h4><i class='bx bx-images'></i> Photo Gallery</h4>
                <div class="gallery-grid">
                    ${member.gallery.map((img, index) => `
                        <div class="gallery-item" onclick="openLightbox('${img}')">
                            <img src="${img}" alt="sana ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (memberId === 'chaeyoung' && member.gallery) {
        galleryHTML = `
            <div class="chaeyoung-gallery">
                <h4><i class='bx bx-images'></i> Photo Gallery</h4>
                <div class="gallery-grid">
                    ${member.gallery.map((img, index) => `
                        <div class="gallery-item" onclick="openLightbox('${img}')">
                            <img src="${img}" alt="Chaeyoung ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="member-profile">
            <div class="member-profile-left">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="member-profile-right">
                <div class="member-profile-header">
                    <h2>${member.name}</h2>
                    <p class="role">${member.role}</p>
                </div>
                
                <div class="member-stats">
                    <div class="stat-box">
                        <i class='bx bx-cake'></i>
                        <p class="label">Birthday</p>
                        <p class="value">${member.birthdate}</p>
                    </div>
                    <div class="stat-box">
                        <i class='bx bx-flag'></i>
                        <p class="label">Nationality</p>
                        <p class="value">${member.nationality}</p>
                    </div>
                    <div class="stat-box">
                        <i class='bx bx-brain'></i>
                        <p class="label">MBTI</p>
                        <p class="value">${member.mbti}</p>
                    </div>
                </div>
                
                <div class="member-bio">
                    <h4><i class='bx bx-user'></i> About</h4>
                    <p>${member.bio}</p>
                </div>
                
                ${galleryHTML}
                
                <div class="member-social">
                    <a href="${member.instagram}" class="social-btn" title="Instagram">
                        <i class='bx bxl-instagram'></i>
                    </a>
                    <a href="${member.twitter}" class="social-btn" title="Twitter">
                        <i class='bx bxl-twitter'></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Member Modal
function closeMemberModal() {
    const modal = document.getElementById('memberModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Lightbox for gallery images
function openLightbox(imageSrc) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('imageLightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'imageLightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" onclick="closeLightbox()">
                <i class='bx bx-x'></i>
            </button>
            <img src="" alt="Gallery Image">
        `;
        document.body.appendChild(lightbox);
    }
    
    const img = lightbox.querySelector('img');
    img.src = imageSrc;
    
    lightbox.classList.add('active');
}

// Close Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMemberModal();
        closeLightbox();
    }
});

// Add entrance animation for member cards
document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

console.log('🎭 TWICE Members Page Loaded!');
console.log('👥 Members: Nayeon, Jeongyeon, Momo, Sana, Jihyo, Mina, Dahyun, Chaeyoung, Tzuyu');
