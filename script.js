document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll-video');
    const scrollContainer = document.getElementById('scroll-container');
    const overlay = document.querySelector('.sticky-video-container');

    // Pause video to ensure it doesn't play automatically
    video.pause();

    // Ensure the video metadata is loaded before we try to get its duration
    video.addEventListener('loadedmetadata', () => {
        let isScrolling = false;

        const updateVideoTime = () => {
            // Calculate how far down the user has scrolled as a percentage
            const scrollY = window.scrollY;
            const maxScroll = scrollContainer.scrollHeight - window.innerHeight;
            const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));

            // Set the video time based on the scroll fraction
            if (video.duration) {
                video.currentTime = scrollFraction * video.duration;
            }

            // Hide the overlay text when the user starts scrolling
            if (scrollY > 50 && !isScrolling) {
                overlay.classList.add('is-scrolling');
                isScrolling = true;
            } else if (scrollY <= 50 && isScrolling) {
                overlay.classList.remove('is-scrolling');
                isScrolling = false;
            }

            // Request next frame
            requestAnimationFrame(updateVideoTime);
        };

        // Start the animation loop
        requestAnimationFrame(updateVideoTime);
    });

    // Fallback if metadata is already loaded by the time this runs
    if (video.readyState >= 1) {
        video.dispatchEvent(new Event('loadedmetadata'));
    }
});
